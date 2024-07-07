import { title } from 'process';
import styled from 'styled-components';

const Colors: Record<string, string> = {
  warning: 'yellow',
  good: 'green',
};

const StackedBar = (props: { title?: string; graphData: any }) => {
  return (
    <div className='w-full'>
      <h1 className='mb-4 font-semibold'>Return Graph</h1>
      <div
        style={{
          display: 'flex',
          flex: '1 1 auto',
          alignSelf: 'auto',
        }}
      >
        {props && props.graphData.data ? (
          props.graphData.data.map((item: any, index: any) => {
            const percentage = (item.value / item.total) * 100;
            return (
              <Rectangle
                key={index}
                percentage={percentage}
                color={Colors[item.color]}
              />
            );
          })
        ) : (
          <Rectangle
            percentage={100}
            color='grey'
          />
        )}
      </div>
    </div>
  );
};

export default StackedBar;

const Rectangle = styled.div<{ percentage: number; color: string }>`
  height: 20px;
  width: ${(props) => props.percentage}%;
  background-color: ${(props) => props.color};
`;

const NormalBold = styled.p`
  font-weight: 700;
  font-size: var(--font-size-normal);
`;
