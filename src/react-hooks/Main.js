import { useInput } from './useInput';

const Main = () => {
  const maxLen = (value) => !value.includes('@');
  const name = useInput('Kim', maxLen);
  return (
    <div className="Main">
      <h1>Use custom react hooks</h1>
      <input placeholder="name" {...name} />
    </div>
  );
};

export default Main;
