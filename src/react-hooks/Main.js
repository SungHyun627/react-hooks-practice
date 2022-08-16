import useInput from './useInput';
import useTabs from './useTabs';
import useTitle from './useTitle';
import useClick from './useClick';
import useConfirm from './useConfirm';
import usePreventLeave from './usePreventLeave';
import useBeforeLeave from './useBeforeLeave';
import useFadeIn from './useFadeIn';
import useNetwork from './useNetwork';
import useFullscrren from './useFullscreen';
import memories from '../asset/memories.png';
import useNotification from './useNotification';
// import useScroll from './useScroll';

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

  const beForeLeave = () => console.log("don't leave");
  useBeforeLeave(beForeLeave);

  const fadeInH1 = useFadeIn(3);

  const handleNetworkChange = (online) => {
    console.log(online ? 'Hi, Online' : 'Hi, OffLine');
  };
  const onLine = useNetwork(handleNetworkChange);

  // const { y } = useScroll();

  const onFull = (isFull) => {
    console.log(isFull ? 'full' : 'small');
  };
  const { element, triggerFull, exitFull } = useFullscrren(onFull);

  const triggerNotification = useNotification('Hello', { body: 'nice' });
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
      <div>
        <h1>Hello</h1>
      </div>
      <div>
        <h1 {...fadeInH1}>Fade In</h1>
      </div>
      <div>
        <h1>{onLine ? 'Online' : 'OffLine'}</h1>
      </div>

      <div>
        <div ref={element}>
          <img src={memories} alt="memories" style={{ height: '200px' }} />
          <button onClick={exitFull}>Exit Fullscreen</button>
        </div>
        <button onClick={triggerFull}>Make Fullscreen</button>
      </div>

      <div>
        <button onClick={triggerNotification}>Hello</button>
      </div>
    </div>
  );
};

export default Main;
