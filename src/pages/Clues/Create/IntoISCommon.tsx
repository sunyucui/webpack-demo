import React from "react";
import {
    getbusinessLineInfos,
    getProductLine,
    getClewSourceByBusinessType,
    getIndustryList,
    getAreas,
} from './service'
import { Row, Col, Form, Input, Button, Select, Cascader, Dropdown, Space ,InputNumber } from "antd";
const { TextArea, Search } = Input;
import { InfoCircleOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';


export default class IntoISCommon extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            linkWay: 0,
            businessLineOptions: [],
            productLineOptions: [],
            clewSourceOptions: [],
            industryOptions: [],
            areasOptions: [], 
        }
    }

    // 请求数据
    async componentDidMount() {
        // 业务线数据
        const { data: { code: businessCode, data: { businessLineInfos } } } = await getbusinessLineInfos(localStorage.getItem('ticket'))
        if (businessCode === 0) {
            this.setState({
                businessLineOptions: businessLineInfos.map(item => {
                    return { value: item.businessName, label: item.businessName }
                })
            })
        }
        // 线索来源 Cascader

        const { data: { code: clewSourceCode, data: clewSource } } = await getClewSourceByBusinessType("software");
        if (clewSourceCode === 0) {
            this.setState({
                clewSourceOptions: this.getClewList(clewSource)
            })
            // console.log('clew: ',this.state.clewSourceOption)
        }

        // 产品线数据
        const { data: { code: productLineCode, data: productLine } } = await getProductLine();
        if (productLineCode === 0) {
            this.setState({
                productLineOptions: productLine.map(item => {
                    return { value: item.productLineName, label: item.productLineName }
                })
            })
            // console.log('productline',data,this.state.productLineOption)
        }
        // 行业
        const { data: { code: industryCode, data: industry } } = await getIndustryList();
        if (industryCode === 0) {
            this.setState({
                industryOptions: this.getIndustry(industry, 0)
            })
            //    console.log(this.state.industryOptions)
        }
        // 地区
        const { data: { code: areasCode, data: areas } } = await getAreas();
        if (areasCode === 0) {
            this.setState({
                areasOptions: this.getAreaTree(areas, 0)
            })
            // console.log(this.state.areasOptions)
        }


    }

    /**
     * 递归遍历树形结构 [{[[]]}]
     * @param dataList 
     * @returns 
     */
    getClewList(dataList) {
        let newList = [];
        function regroupList(list) {
            newList = list.map(item => {
                const { fromName, childList } = item;
                if (childList && childList.length > 0) {
                    return {
                        value: fromName,
                        label: fromName,
                        children: regroupList(childList),
                    };
                }
                return {
                    value: fromName,
                    label: fromName,
                };
            });
            return newList;
        }
        regroupList(dataList);
        return newList;
    }
    // [{},{},{}]
    getIndustry(data, root) {
        var newList = [];
        for (var i = 0; i < data.length; i++) {
            const { industryName } = data[i]
            if (root == data[i].parentId) {
                // data[i].children = getChildren(data, data[i].id);
                newList.push({
                    value: industryName,
                    label: industryName,
                    children: this.getIndustry(data, data[i].id)
                });
            }
        }
        return newList;
    }
    // 地区级联
    getAreaTree(data, root) {
        var newList = [];
        for (var i = 0; i < data.length; i++) {
            const { shortName } = data[i]
            if (root == data[i].parentCode) {
                // data[i].children = getChildren(data, data[i].id);
                newList.push({
                    value: shortName,
                    label: shortName,
                    children: this.getAreaTree(data, data[i].areaCode)
                });
            }
        }
        return newList;
    }

    handleLinkWayChange  = (value: any)  =>{
        this.setState({linkWay:value})
    }
    onSearch = (value: any) => {
        console.log(value)
    }
    // 表单提交
    onFinish = (values: any) => {
        console.log('Success:', values);
      };

    // 渲染组件
    render() {

        return (
            <>
                {/* <Select
                    placeholder="请选择业务线"
                    allowClear={true}
                    options={this.state.businessLineOptions}
                /> */}
                {/* <Select
                    placeholder="请选择产品线"
                    allowClear={true}
                    options={this.state.productLineOptions}
                /> */}
                {/* <Cascader options={this.state.clewSourceOptions} placeholder="请选择线索来源" /> */}
                {/* <Cascader options={this.state.industryOptions} placeholder="请选择行业" />
                <Cascader options={this.state.areasOptions} placeholder="请选择地区" /> */}
                <Form name="intoCluesLibraryForm" layout="vertical" onFinish={this.onFinish}>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="业务线"
                                name="businessLineName"
                                rules={[{ required: true, message: '请选择业务线' }]}
                            >
                                <Select
                                    placeholder="请选择业务线"
                                    allowClear={true}
                                    // style={{ width: 120 }}
                                    // onChange={handleChange}
                                    options={this.state.businessLineOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="线索来源"
                                name="clewFromSource"
                                rules={[{ required: true, message: '请选择线索来源' }]}
                            >
                                <Cascader options={this.state.clewSourceOptions}  placeholder="请选择线索来源" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="来源备注"
                                name="sourceTag"
                                rules={[{ required: false, message: '请输入来源备注' }]}
                            >
                                <Input placeholder="请输入来源备注" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="客户类型"
                                name="customerType"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    defaultValue="普通客户"
                                    allowClear={true}
                                    options={[
                                        {
                                            value: '个人客户',
                                            label: '个人客户',
                                        },
                                        {
                                            value: '普通客户',
                                            label: '普通客户',
                                        },

                                        {
                                            value: '外资公司',
                                            label: '外资公司',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="产品线"
                                name="fromSource"
                                rules={[{ required: true, message: '请选择产品线' }]}
                            >
                                <Select
                                    placeholder="请选择产品线"
                                    allowClear={true}
                                    options={this.state.productLineOptions}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="客户名称"
                                name="customerName"
                                tooltip={{ title: '工商校验的公司名称', icon: <InfoCircleOutlined /> }}
                                rules={[{ required: true, message: '请输入客户名称' }]}
                            >
                                <Search
                                    placeholder="请输入客户名称"
                                    allowClear
                                    enterButton="验证"
                                    onSearch={this.onSearch}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="品牌名"
                                name="weChat"
                                rules={[{ required: false, message: '请输入品牌名' }]}
                            >
                                <Input placeholder="请输入品牌名" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="分店数"
                                name="qq"
                                rules={[{ required: true, message: '请输入分店数' }]}
                            >
                                <InputNumber  min={0} placeholder="请输入分店数" style={{width:"100%"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="联系人姓名"
                                name="linkName"
                                rules={[{ required: true, message: '请输入联系人姓名' }]}
                            >
                                <Input placeholder="请输入联系人姓名" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="联系方式"
                                name="linkWay"
                                rules={[{ required: true, message: '请输入联系人姓名' }]}
                            >
                                <Row>
                                    <Col span={6}>
                                        <Select
                                            defaultValue={this.state.linkWay}
                                            onChange={this.handleLinkWayChange}
                                            options={[
                                                {
                                                    value: 0,
                                                    label: '手机号码',
                                                },
                                                {
                                                    value: 1,
                                                    label: '固话',
                                                },
                                            ]}
                                        />
                                    </Col>
                                    {this.state.linkWay === 0 ? (
                                        <Col span={18}>
                                            <Input placeholder="请输入手机号码"></Input>
                                        </Col>
                                    ) : (
                                        <>
                                            <Col span={6}>
                                                <Input placeholder="区号"></Input>
                                            </Col>
                                            <Col span={6}>
                                                <Input placeholder="固定号码"></Input>
                                            </Col>
                                            <Col span={6}>
                                                <Input placeholder="分机号"></Input>
                                            </Col>
                                        </>
                                    )}
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>

                   

                    <Row>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="行业"
                                name="industryId"
                                rules={[{ required: false, message: '行业' }]}
                            >
                                <Cascader options={this.state.industryOptions} placeholder="行业" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                className="colGap"
                                label="地区"
                                name="areaCode"
                                rules={[{ required: true, message: '地区' }]}
                            >
                                <Cascader options={this.state.areasOptions} placeholder="地区" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item
                                className="colGap"
                                label="地址"
                                name="detailAddress"
                                rules={[{ required: false, message: '请输入地址' }]}
                            >
                                <TextArea rows={4} showCount maxLength={30} placeholder="请输入地址" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type="primary" className="btnGap" htmlType="submit">
                                提交
                            </Button>
                            <Button className="colGap">取消</Button>
                        </Col>
                    </Row>
                </Form>
            </>


        )
    }
}