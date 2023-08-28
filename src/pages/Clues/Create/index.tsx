import { Card, Tabs } from 'antd';
import { useState } from 'react';
import IntoCluesLibrary from './IntoCluesLibrary'
import IntoISCommon from './IntoISCommon'
import './index.less';
import {tabList} from './service'

export default () => {
  // 当前的tab停留
  const [activeTabKey, setActiveTabKey] = useState<string>('intoCluesLibrary');
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  const contentList: Record<string, React.ReactNode> = {
    intoCluesLibrary: <IntoCluesLibrary />,
    intoISCommon: <IntoISCommon />,
    // intoISCommon: <IntoISCommon />,
    intoISPrivate: <IntoCluesLibrary />,
    intoShopCommon: <IntoCluesLibrary />,
    intoShopPrivate: <IntoCluesLibrary />,
    intoCustomer: <IntoCluesLibrary />,
    intoAD: <IntoCluesLibrary />,
    intoADPrivate: <IntoCluesLibrary />,
  };

  return (
    <div>
        {/* <Demo></Demo> */}
        <Card
          tabList={tabList}
          activeTabKey={activeTabKey}
          bordered={false}
          onTabChange={(key) => {
            onTabChange(key);
          }}
        >
          {contentList[activeTabKey]}
        </Card>
    </div>
  );
};
