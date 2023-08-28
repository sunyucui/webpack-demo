import React from "react";
import { Row, Col, Form, Input, Button, Select, Cascader, Radio, Space, Table, Card, Pagination, DatePicker, Modal, Icon } from "antd";
import { columns,getClewTableData, getClewSourceByBusinessType, getclews } from '../service'
import moment from 'moment';

const { RangePicker } = DatePicker;

export default class Claimed extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clewTableData: [],
      pagination: [],
      searchType: "客户名称",
      clewSourceOptions: [],
      isModalOpen: false,
      selectedRowKeys: []
    }
  }
  async componentDidMount() {
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
      // console.log('clew: ',this.state.clewSourceOption)
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
  onFinish = async (values: any) => {
    // 时间数据
    let data = {
      beginTime: moment(values.rangePicker[0]).format('YYYY-MM-DD')||'',
      endTime: moment(values.rangePicker[1]).format('YYYY-MM-DD')||'',
      customerNameSearch: values.searchInput.customerNameSearch||'',
      fromSourceCode: values.fromSourceCode||'',
      pageSize: 10,
      page: 1,
      tabCode: 4001001
    };

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

  onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    this.setState({ selectedRowKeys: newSelectedRowKeys });
  };
  // form方法调用
  // formRef = React.createRef()
  // columns = [
  //   {
  //     title: '客户名称',
  //     dataIndex: 'businessLineName',
  //     key: 'businessLineName',
  //     width: 150,
  //     fixed: 'left',
  //   },
  //   {
  //     title: '线索ID',
  //     dataIndex: 'clewId',
  //     key: 'clewId',
  //     width: 200,
  //   },
  //   {
  //     title: '地区',
  //     dataIndex: 'area',
  //     key: 'area',
  //     width: 150,
  //   },
  //   {
  //     title: '行业',
  //     dataIndex: 'industry',
  //     key: 'industry',
  //     width: 150,
  //   },
  //   {
  //     title: '线索来源',
  //     dataIndex: 'clewFromSourceName',
  //     key: 'clewFromSourceName',
  //     width: 200,
  //   },
  //   {
  //     title: '标签',
  //     dataIndex: 'address',
  //     key: 'address',
  //     width: 150,
  //   },
  //   {
  //     title: '来源备注',
  //     dataIndex: 'address',
  //     key: 'address',
  //     width: 150,
  //   },
  //   {
  //     title: '创建时间',
  //     dataIndex: 'createTime',
  //     key: 'createTime',
  //     width: 200,
  //   },
  //   {
  //     title: '清洗标签',
  //     dataIndex: 'cleanTagDesc',
  //     key: 'cleanTagDesc',
  //     width: 150,
  //   },
  //   {
  //     title: '加急标签',
  //     dataIndex: 'address',
  //     key: 'address',
  //     width: 150,
  //   },
  //   {
  //     title: '加急时间',
  //     dataIndex: 'updateTime',
  //     key: 'updateTime',
  //     width: 200,
  //   },
  //   {
  //     title: '状态',
  //     dataIndex: 'address',
  //     key: 'address',
  //     width: 150,
  //   },
  //   {
  //     title: '处理人',
  //     dataIndex: 'handlerName',
  //     key: 'handlerName',
  //     width: 150,
  //   },
  //   {
  //     title: '清洗备忘录',
  //     dataIndex: 'address',
  //     key: 'address',
  //     width: 150,
  //   },
  //   {
  //     title: '操作',
  //     key: 'operation',
  //     fixed: 'right',
  //     width: 200,
  //     render: () => {
  //       return (
  //         <>
  //           <Button onClick={() => { }}>详情</Button>
  //           <Button onClick={this.openModal}>再分配</Button>
  //           <Modal title="选择分配人员" open={this.state.isModalOpen} onOk={this.closeModal} onCancel={() => this.closeModal}>
  //             <Form name='modalForm'>
  //               <Form.Item
  //                 name=""
  //                 label="选择分配人员"
  //                 rules={[{ required: true, message: '请输入员工姓名' }]}
  //               >
  //                 <Input placeholder='输入姓名查找员工'></Input>
  //               </Form.Item>
  //             </Form>
  //           </Modal>
  //         </>
  //       );
  //     }
  //   },
  // ];

  // rowSelection = {
  //   selectedRowKeys: this.state.selectedRowKeys,
  //   onChange: this.onSelectChange,
  // };
  // hasSelected = this.state.selectedRowKeys.length > 0;
  render() {

    return (
      <>

        <Form name="searchTableForm" onFinish={this.onFinish} ref={this.formRef} >
          <Space>
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
              <Button><Icon type="reload" htmlType="button" onClick={() => this.formRef.current.resetFields()} />重置</Button>
              <Button>更多</Button>
            </Form.Item>

          </Space>
        </Form>

        <Card style={{ marginTop: '20px' }}>
          <h3>待审领（线索公海）</h3>
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Button type="primary" disabled={!this.hasSelected}>
                分配
              </Button>
              <Button type="primary" disabled={!this.hasSelected}>
                申领
              </Button>
            </Space>

            <span style={{ marginLeft: 8 }}>
              {this.hasSelected ? `Selected ${this.state.selectedRowKeys.length} items` : ''}
            </span>
          </div>
          {/* 表格显示 */}
          <Table
            // rowSelection={this.rowSelection}
            dataSource={this.state.clewTableData}
            columns={columns}
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

      </>
    )
  }
}


// export default (props: any) => {
//   return (
//     <ProPage
//       formConfig={getFormConfig()}
//       tableConfig={getTableConfig()}
//       update={() => {
//         props.update();
//       }}
//     />
//   );
// };
