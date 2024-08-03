import React from 'react';
import styled from 'styled-components';

// Assuming Colors and other necessary imports are defined elsewhere
const Colors: Record<string, string> = {
  warning: 'yellow',
  good: 'green',
  bad: 'red',
};
// Define proper types for props
interface GraphDataItem {
  value: number;
  total: number;
  color: keyof typeof Colors; // Assuming Colors is an object with keys
}

interface StackBarProps {
  graphData: GraphDataItem[];
}

const Rectangle = styled.div<{ percentage: any; color: string }>`
  height: 20px;
  width: ${(props) => props.percentage}%;
  background-color: ${(props) => props.color};
`;

const RectangleMemo = React.memo(Rectangle);

const renderRectangle = (item: GraphDataItem, index: number) => {
  const percentage = (item.value / item.total) * 100;
  return (
    <RectangleMemo
      key={index} // Consider using a more stable identifier here
      percentage={percentage}
      color={Colors[item.color]}
    />
  );
};

const StackBar: React.FC<StackBarProps> = (props) => (
  <div className='w-full'>
    <h1 className='mb-4 font-semibold'>Return Graph</h1>
    <div
      style={{
        display: 'flex',
        flex: '1 1 auto',
        alignSelf: 'auto',
      }}
    >
      {props.graphData && props.graphData.length > 0 ? (
        props.graphData.map(renderRectangle)
      ) : (
        <RectangleMemo
          percentage={100}
          color='grey'
        />
      )}
    </div>
  </div>
);

export default React.memo(StackBar);
