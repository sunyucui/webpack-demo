import { Card, Tabs } from 'antd';
import { useState } from 'react';
import Clue from './Clue';
import Claimed from './Claimed';

// import './index.less';
import { softwareTabList } from './service'

export default () => {
  
  const itemList = [
    {
      label: '线索库',
      key: 'clues',
      children: <Clue />,
    },
    {
      label: '待审领（线索公海）',
      key: 'toClaimed',
      children: <Claimed />,
    },
  ]

  return (
    <div>
      <Tabs
        defaultActiveKey={'clues'}
        items={itemList}></Tabs>
    </div>
  );
};
