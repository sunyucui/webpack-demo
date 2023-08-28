import { Button, Descriptions, PageHeader, Card, Tag, Divider, Alert, Table, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { getClewById, getLinkPerson, getUrgentLogs,getClueLogs, linkTableCol,urgentCol,ClueLogsCol } from '../service';
import { useLocation, useParams } from 'umi';
import { ThunderboltFilled } from '@ant-design/icons';


export default () => {
    // 获取路由参数
    const { clewId } = useParams();
    const [clewDescription, setClewDescription] = useState({});
    // const [urgentInfo, setUrgentInfo] = useState({});
    const [linkPerson, setLinkPerson] = useState([]);
    const [urgentLogs, setUrgentLogs] = useState([]);
    const [clueLogs, setClueLogs] = useState([]);


    // let clewDescription={}
    /**
     * 异步请求数据
     */
    const getClewDescription = async () => {
        const { data: { code: clewDataCode, data: clewData } } = await getClewById(clewId);
        if (clewDataCode === 0) {
            setClewDescription(clewData)
            if (clewDescription.customerType == '1') setClewDescription({
                ...clewDescription,
                customerType: '个人商户'
            })
            if (clewDescription.customerType == '2') setClewDescription({
                ...clewDescription,
                customerType: '普通商户'
            })
            if (clewDescription.customerType == '3') setClewDescription({
                ...clewDescription,
                customerType: '企业商户'
            })
            console.log(clewDescription)
        }
    }
    const getLinkPersonData = async () => {
        const { data: { code: linkPersonCode, data: linkPersonData } } = await getLinkPerson(clewId);
        if (linkPersonCode === 0) {
            setLinkPerson(linkPersonData)
        }
    }
    const getUrgentLogsData = async () => {
        const { data: { code: urgentLogsCode, data: urgentLogsData } } = await getUrgentLogs(clewId);
        if (urgentLogsCode === 0) {
            setUrgentLogs(urgentLogsData)
        }
    }
    const getClueLogsData =async () => {
        const { data: { code: clueLogsCode, data: clueLogsData, pagination } } = await getClueLogs(clewId);
        if (clueLogsCode === 0) {
            setClueLogs(clueLogsData)
        }
    }

    useEffect(() => {
        getClewDescription();
        getLinkPersonData();
        getUrgentLogsData();
        getClueLogsData();
    }, [])

    /**
     *内部组件
     */
    function AlertMsg() {
        return (
            <Descriptions column={2}>
                <Descriptions.Item label="加急等级"></Descriptions.Item>
                <Descriptions.Item label="备注"></Descriptions.Item>
                <Descriptions.Item label="加急时间"></Descriptions.Item>
                <Descriptions.Item label="联系方式"></Descriptions.Item>

                {/* <Descriptions.Item label="加急等级">{clewDescription.urgentInfo.urgentClass}</Descriptions.Item>
                <Descriptions.Item label="备注">{clewDescription.urgentInfo.urgentRemark}</Descriptions.Item>
                <Descriptions.Item label="加急时间">{clewDescription.urgentInfo.urgentStatus}</Descriptions.Item>
                <Descriptions.Item label="联系方式">{clewDescription.urgentInfo.urgentMobile}</Descriptions.Item> */}
            </Descriptions>)

    }

    function ClueLogTable(){
        return (
            <Table dataSource={clueLogs} columns={ClueLogsCol} scroll={{ x: 1500 }} pagination={false} />
        )
    }
    function UrgentLogTable(){
        return (
            <Table dataSource={urgentLogs} columns={urgentCol} scroll={{ x: 1500 }} pagination={false} />
        )
    }


    return (
        <div>
            <PageHeader
                ghost={false}
                title={clewDescription.customerName}
                subTitle={<>
                    {clewDescription.cleanTag == '1' ?
                        <Tag color="red">加急</Tag> :
                        <Tag color="yellow">其他</Tag>
                    }
                    <Tag color="blue">{clewDescription.cleanTagDesc}</Tag>
                </>}
                extra={[
                    <Button>
                        <a href={`/clues/clues-library/general-soft`}>返回</a>
                    </Button>
                ]}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="销售">{clewDescription.handlerName}</Descriptions.Item>
                    <Descriptions.Item label="线索ID">{clewDescription.clewId}</Descriptions.Item>
                    <Descriptions.Item label="产品线">{clewDescription.solutionType}</Descriptions.Item>
                    <Descriptions.Item label="线索来源">{clewDescription.clewFromSourceName}</Descriptions.Item>
                    <Descriptions.Item label="业务线">{clewDescription.businessLineName}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{clewDescription.createTime}</Descriptions.Item>
                    <Descriptions.Item label="来源备注">{clewDescription.sourceTag}</Descriptions.Item>
                    <Descriptions.Item label="联系人信息">{clewDescription.linkName + "  " + clewDescription.mobile}</Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <Card style={{ marginTop: '10px' }}>
                <p style={{ color: 'red', marginTop: '10px' }}>
                    <ThunderboltFilled />客服加急信息
                </p>
                {/* 警告信息 */}
                <Alert
                    description={<AlertMsg />}
                    type="error"
                />

                <p style={{ marginTop: '30px' }}>联系人信息</p>
                <Table dataSource={linkPerson} columns={linkTableCol} scroll={{ x: 1500 }} pagination={false} />
                
                {/* 基本信息 */}
                <p style={{ marginTop: '30px' }}>基本信息</p>
                <Divider></Divider>
                
                <Descriptions
                    bordered
                    column={3}
                >
                    <Descriptions.Item label="线索ID">{clewDescription.clewId}</Descriptions.Item>
                    <Descriptions.Item label="产品线">{clewDescription.solutionType}</Descriptions.Item>
                    <Descriptions.Item label="业务线">{clewDescription.businessLineName}</Descriptions.Item>
                    <Descriptions.Item label="客户类型">{clewDescription.customerType}</Descriptions.Item>
                    <Descriptions.Item label="客户名称">{clewDescription.customerName}</Descriptions.Item>
                    <Descriptions.Item label="联系人姓名">{clewDescription.linkName}</Descriptions.Item>
                    <Descriptions.Item label="联系方式">{clewDescription.mobile}</Descriptions.Item>
                    <Descriptions.Item label="商户名称">{clewDescription.customerName}</Descriptions.Item>
                    <Descriptions.Item label="线索来源">{clewDescription.clewFromSourceName}</Descriptions.Item>
                    <Descriptions.Item label="来源备注">{clewDescription.sourceTag}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{clewDescription.createTime}</Descriptions.Item>
                    <Descriptions.Item label="账号主体">{clewDescription.accountMainBody}</Descriptions.Item>
                    <Descriptions.Item label="行业">{clewDescription.industry}</Descriptions.Item>
                    <Descriptions.Item label="地区">{clewDescription.area}</Descriptions.Item>
                    <Descriptions.Item label="经营状态">{clewDescription.manageStatus}</Descriptions.Item>
                    <Descriptions.Item label="主营产品">{clewDescription.manageProductId}</Descriptions.Item>
                    <Descriptions.Item label="注册时间">{clewDescription.registerCapital}</Descriptions.Item>
                    <Descriptions.Item label="注册地址">{clewDescription.registerAddress}</Descriptions.Item>
                    <Descriptions.Item label="法人">{clewDescription.legalPerson}</Descriptions.Item>
                    <Descriptions.Item label="资质类型">{clewDescription.qualificationType}</Descriptions.Item>
                    <Descriptions.Item label="信用代码">{clewDescription.creditCode}</Descriptions.Item>
                    <Descriptions.Item label="地址" span={5}>{clewDescription.detailAddress}<br /> </Descriptions.Item>
                    <Descriptions.Item label="经营范围" span={5}>{clewDescription.shopType}<br /> </Descriptions.Item>
                    <Descriptions.Item label="公司详情" span={5}>{clewDescription.shopName}<br /> </Descriptions.Item>
                    <Descriptions.Item label="备注" span={5}>{clewDescription.sourceTag}<br /> </Descriptions.Item>
                </Descriptions>
                {/* 加急日志 线索日志 */}
                <Tabs
                    style={{ marginTop: '50px' }}
                    defaultActiveKey={'1'}
                    items={[
                        {
                            label: `加急日志`,
                            key: '1',
                            children: <UrgentLogTable/>,
                        },
                        {
                            label: `线索日志`,
                            key: '2',
                            children: <ClueLogTable/>,
                        }
                    ]}
                />
            </Card>

        </div>
    );
}