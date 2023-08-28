import React from "react";
import { Row, Col, Form, Input, Button, Select, Cascader, Dropdown, Space, Table, Card, Pagination, DatePicker, Icon, Modal } from "antd";
import { columns, getClewTableData, getClewSourceByBusinessType, getclews } from '../service'
import moment from 'moment';
import { ReloadOutlined } from '@ant-design/icons';
import { Link } from "umi";

const { RangePicker } = DatePicker;

export default class Clue extends React.PureComponent {
  formRef = React.createRef()
  constructor(props: any) {
    super(props);
    this.state = {
      clewTableData: [],
      pagination: [],
      searchType: "客户名称",
      clewSourceOptions: [],
      isModalOpen: false
    }
  }
  async componentDidMount() {
    console.log("开始渲染！！！", this.formRef)
    // 业务线数据-表格显示
    const { data: { code: clewTableDataCode, data: clewTableData, pagination } } = await getClewTableData();
    if (clewTableDataCode === 0) {
      this.setState({
        clewTableData,
        pagination
      })
      // console.log(clewTableData)
    }

    // 线索来源 Cascader
    const { data: { code: clewSourceCode, data: clewSource } } = await getClewSourceByBusinessType("software");
    if (clewSourceCode === 0) {
      this.setState({
        clewSourceOptions: this.getClewList(clewSource)
      })
    }
  }
  getClewList(dataList: any) {
    let newList: any[] = [];
    function regroupList(list: any[]) {
      newList = list.map(item => {
        const { fromName, childList, id } = item;
        if (childList && childList.length > 0) {
          return {
            value: id,
            label: fromName,
            children: regroupList(childList),
          };
        }
        return {
          value: id,
          label: fromName,
        };
      });
      return newList;
    }
    regroupList(dataList);
    return newList;
  }
  // 表单提交
  onFinish = async (values: any = {}) => {
    // 时间数据
    let data = {
      pageSize: 10,
      page: 1,
      tabCode: 4001011
    };
    if (values && values.rangePicker) {
      data.beginTime = moment(values.rangePicker[0]).format('YYYY-MM-DD');
      data.endTime = moment(values.rangePicker[1]).format('YYYY-MM-DD');
    }
    if (values && values.searchInput) {
      data.customerNameSearch = values.searchInput.customerNameSearch;
    }
    if (values && values.fromSourceCode) {
      data.fromSourceCode = values.fromSourceCode;
    }

    //提交查询
    const { data: { code: clewTableDataCode, data: clewTableData = [], pagination = {} } } = await getclews(data);
    if (clewTableDataCode === 0) {
      this.setState({
        clewTableData,
        pagination
      })
      // console.log(clewTableData)
    }
    console.log('Success:', values);
  };
  // 弹框的开合
  closeModal = () => {
    this.setState({ isModalOpen: false })
  }
  openModal = () => {
    this.setState({ isModalOpen: true })
  }
  // 重置按钮
  reset = () => {
    this.formRef.current.resetFields();
    this.formRef.current.submit();
  }
  render() {

    return (
      <>

        <Form name="searchTableForm" onFinish={this.onFinish} ref={this.formRef} >
          <Space>
            {/* <Form.Item name="customerNameSearch">
              <Select
                defaultValue={this.state.searchType}
                onChange={(searchType) => {
                  this.setState({ searchType });
                }}
                options={[
                  {
                    value: '客户名称',
                    label: '客户名称',
                  },
                  {
                    value: '线索ID',
                    label: '线索ID',
                  },

                  {
                    value: '联系电话',
                    label: '联系电话',
                  },
                  {
                    value: '商品名/品牌名',
                    label: '商品名/品牌名',
                  },
                ]}></Select>
            </Form.Item> */}

            <Form.Item>
              <Input.Group compact>
                <Form.Item
                  name={['searchInput', 'select']}
                  noStyle
                >
                  <Select
                    defaultValue={this.state.searchType}
                    onChange={(searchType) => {
                      this.setState({ searchType });
                    }}
                    options={[
                      {
                        value: '客户名称',
                        label: '客户名称',
                      },
                      {
                        value: '线索ID',
                        label: '线索ID',
                      },

                      {
                        value: '联系电话',
                        label: '联系电话',
                      },
                      {
                        value: '商品名/品牌名',
                        label: '商品名/品牌名',
                      },
                    ]}></Select>
                </Form.Item>
                <Form.Item
                  name={['searchInput', 'customerNameSearch']}
                  noStyle
                >
                  <Input style={{
                    width: '50%',
                  }} placeholder={`请输入${this.state.searchType}`}></Input>
                </Form.Item>
              </Input.Group>
            </Form.Item>

            {/* 查询日期 */}
            <Form.Item name="rangePicker">
              <RangePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item name="fromSourceCode">
              <Cascader
                options={this.state.clewSourceOptions}
                // onChange={onChange}
                multiple
                maxTagCount="responsive"
                placeholder='线索来源'
                style={{ width: '300px' }}
              />
            </Form.Item>
            <Form.Item name="formBtn">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button onClick={this.reset}>
                <ReloadOutlined />
                重置
              </Button>
              <Button>更多</Button>
            </Form.Item>

          </Space>
        </Form>

        <Card style={{ marginTop: '20px' }}>
          <h3>线索库</h3>
          {/* 表格显示 */}
          <Table
            dataSource={this.state.clewTableData}
            columns={[
              ...columns,
              {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 200,
                render: (_, record) => {
                  return (
                    <>
                      <Button>
                        <a href={`/clues/clues-library/clueDescription/${record.clewId}`}>详情</a>
                      </Button>
                      <Button onClick={this.openModal}>再分配</Button>
                    </>
                  );
                }
              },
            ]}
            scroll={{ x: 1500, y: 500 }}
            pagination={false}
          />
          {/* 分页 */}
          <Pagination
            showTotal={total => `共 ${this.state.pagination.totalCount} 条` || 0}
            showQuickJumper
            current={this.state.pagination.page}
            defaultCurrent={this.state.pagination.page}
            total={this.state.pagination.pageCount}
            style={{ textAlign: 'right', marginTop: 20 }} />
        </Card>
        {/*  */}
        <Modal title="选择分配人员" open={this.state.isModalOpen} onOk={this.closeModal} onCancel={this.closeModal}>
          <Form name='modalForm'>
            <Form.Item
              name=""
              label="选择分配人员"
              rules={[{ required: true, message: '请输入员工姓名' }]}
            >
              <Input placeholder='输入姓名查找员工'></Input>
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }
}
