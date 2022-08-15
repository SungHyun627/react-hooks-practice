import useInput from './useInput';
import useTabs from './useTabs';
import useTitle from './useTitle';
import useClick from './useClick';
import useConfirm from './useConfirm';
import usePreventLeave from './usePreventLeave';

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
  }, 2000);

  const sayHi = () => console.log('hi');
  const hi = useClick(sayHi);

  const deleteHi = () => console.log('delete');
  const abortHi = () => console.log('abort');
  const confirmDelete = useConfirm('Delete OK?', deleteHi, abortHi);

  const { enablePrevent, disablePrevent } = usePreventLeave();

  return (
    <div className="Main">
      <h1>Use custom react hooks</h1>
      <input placeholder="name" {...name} />
      <div>
        {contents.map((content, idx) => (
          <button onClick={() => changeItemIndexHandler(idx)}>
            {content.contentDetail}
          </button>
        ))}
      </div>

      <div>{currentItem.contentDetail}</div>
      <div ref={hi}>Hi</div>
      <button onClick={confirmDelete}>Hi World</button>

      <div>
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>UnProtect</button>
      </div>
    </div>
  );
};

export default Main;
