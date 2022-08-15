import useInput from './useInput';
import useTabs from './useTabs';
import useTitle from './useTitle';

const contents = [
  {
    tab: 'Section 1',
    contentDetail: "I'm the content of the Section 1",
  },
  {
    tab: 'Section 2',
    contentDetail: "I'm the content of the Section 2",
  },
  {
    tab: 'Section 3',
    contentDetail: "I'm the content of the Section 3",
  },
];

const Main = () => {
  const maxLen = (value) => !value.includes('@');
  const name = useInput('Kim', maxLen);

  const { currentItem, changeItemIndexHandler } = useTabs(0, contents);
  const titleUpdater = useTitle('Loading');
  setTimeout(() => {
    titleUpdater('home');
  }, 5000);

  return (
    <div className="Main">
      <h1>Use custom react hooks</h1>
      <input placeholder="name" {...name} />
      {contents.map((content, idx) => (
        <button onClick={() => changeItemIndexHandler(idx)}>
          {content.contentDetail}
        </button>
      ))}
      <div>{currentItem.contentDetail}</div>
    </div>
  );
};

export default Main;
