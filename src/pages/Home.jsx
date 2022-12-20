import { useSelector } from 'react-redux';

const Home = () => {
  const list = useSelector((state) => state.todoApp);

  return <div>Home</div>;
};

export default Home;
