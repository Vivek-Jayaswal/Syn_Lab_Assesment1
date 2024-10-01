import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../App.css"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate("/create")
  }

  const handelDelete = async (id) => {
    try {
      const deletedUser = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      console.log(deletedUser);
      setUsers(users.filter((user) => user.id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error(error);
    }
  }

  const handelEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
        setUsers(response.data);
        toast.success("user fetched successfully");
      } catch (error) {
        toast.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, []);


  if (loading) {
    return <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>loading data........</div>
  }


  return (
    <div className='home'>
      {
        users.length > 0 ?
          <table >
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <button onClick={() => handelEdit(item.id)} className='material-icons edit-btn'>edit</button>
                      </td>
                      <td>
                        <button onClick={() => handelDelete(item.id)} className='material-icons delete-btn'>delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
          :
          <p>not found</p>
      }
      <div className='create-btn'>
        <button onClick={handleCreateUser}>Create User</button>
      </div>
    </div>
  );
};

export default Home;
