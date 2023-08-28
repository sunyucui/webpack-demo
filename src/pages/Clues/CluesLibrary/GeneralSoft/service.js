import request from '@/utils/axios-request';
import { Button, Modal, Form, Input } from 'antd'
import { useState } from 'react';

/**
 * form查询表单数据  api/clews
customerNameSearch: 孙玉翠
fromSourceCode: 1000
beginTime: 2023-08-01  ok
endTime: 2023-08-03 ok
pageSize: 10
page: 1
tabCode: 4001001
 */
export function getclews(data) {
  return request({
    method: 'get',
    url: '/api/clews',
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8'
    // },
    params: data,
  });
}
/**
 * 查询加急日志
 * @param {*} clewId 
 * @returns 
 */
export function getUrgentLogs(clewId) {
  return request({
    method: 'get',
    url: '/api/urgentLog',
    params: {
      clewId
    },
  });
}
export function getClueLogs(clewId) {
  return request({
    method: 'get',
    url: `/api/clews/${clewId}/logs`,
  });
}
/**
 * 获取线索详情
 * @param {*} clewId 
 * @returns 
 */
export function getClewById(clewId) {
  return request({
    method: 'get',
    url: `/api/clews/${clewId}`,
    params: {
      id: clewId
    }
  })
}
/**
 * 查询线索联系人
 * @param {*} clewId 
 * @returns 
 */
export function getLinkPerson(clewId) {
  return request({
    method: 'get',
    url: `/api/clews/${clewId}/link`,
    params: {
      id: clewId
    }
  })
}
/**
 * 需要：
 * 1-业务线：getbusinessLineInfos ok
 * 2-线索来源：getClewSourceByBusinessType ok
 * 3-产品线：(productLineCode,productLineName)  getProductLine ok
 * 4-行业：getIndustryList ok
 * 5-地区：getAreas
 * 6-验证客户名称
 * @param {*} data 
 * @returns 
 */


// 1-业务线 businessLineInfos[0].businessName
export function getbusinessLineInfos(data) {
  return request({
    method: 'get',
    url: '/api/account',
    data,
  });
}

// 2-线索来源：
export function getClewSourceByBusinessType(type) {
  return request({
    method: 'get',
    url: '/api/clews/getClewSourceByBusinessType',
    data: {
      businessType: type
    },
  });
}
// 3-产品线 productLineCode,productLineName
export function getProductLine() {
  return request({
    method: 'get',
    url: '/api/productLine',
    data: {
      pageSize: 1000
    },
  });
}
// 4-行业
export function getIndustryList() {
  return request({
    method: 'get',
    url: '/api/basic/selectAllList',
  });
}
// 5-地区：getAreas
export function getAreas() {
  return request({
    method: 'get',
    url: '/api/basic/all/areas',
  });
}


export function getClewTableData() {
  return request({
    method: 'get',
    url: '/api/clews',
    params: {
      pageSize: 10,
      page: 1,
      tabCode: 4001011
    },
  });
}

export const softwareTabList = [
  {
    key: 'clues',
    tab: '线索库',
  },
  {
    key: 'toClaimed',
    tab: '待审领（线索公海）',
  },
]


// const [isModalOpen, setIsModalOpen] = useState(false);

// table demo
export const columns = [
  {
    title: '客户名称',
    dataIndex: 'businessLineName',
    key: 'businessLineName',
    width: 150,
    fixed: 'left',
  },
  {
    title: '线索ID',
    dataIndex: 'clewId',
    key: 'clewId',
    width: 200,
  },
  {
    title: '地区',
    dataIndex: 'area',
    key: 'area',
    width: 150,
  },
  {
    title: '行业',
    dataIndex: 'industry',
    key: 'industry',
    width: 150,
  },
  {
    title: '线索来源',
    dataIndex: 'clewFromSourceName',
    key: 'clewFromSourceName',
    width: 200,
  },
  {
    title: '标签',
    dataIndex: 'address',
    key: 'address',
    width: 150,
  },
  {
    title: '来源备注',
    dataIndex: 'address',
    key: 'address',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 200,
  },
  {
    title: '清洗标签',
    dataIndex: 'cleanTagDesc',
    key: 'cleanTagDesc',
    width: 150,
  },
  {
    title: '加急标签',
    dataIndex: 'address',
    key: 'address',
    width: 150,
  },
  {
    title: '加急时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'address',
    key: 'address',
    width: 150,
  },
  {
    title: '处理人',
    dataIndex: 'handlerName',
    key: 'handlerName',
    width: 150,
  },
  {
    title: '清洗备忘录',
    dataIndex: 'address',
    key: 'address',
    width: 150,
  },

];
export const linkTableCol = [
  {
    title: '类型',
    dataIndex: 'linkType',
    key: 'linkType',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: '职务',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: '姓名',
    dataIndex: 'linkName',
    key: 'linkName',
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: 'qq',
    dataIndex: 'qq',
    key: 'qq',
  },
  {
    title: '手机号码',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: '固话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '微信',
    dataIndex: 'wechat',
    key: 'wechat',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
]
export const urgentCol = [
  {
    title: '线索id',
    dataIndex: 'clewId',
    key: 'clewId',
  },
  {
    title: '一级来源',
    dataIndex: 'firstFromSource',
    key: 'firstFromSource',
  },
  {
    title: '二级来源',
    dataIndex: 'secondFromSource',
    key: 'secondFromSource',
  },
  {
    title: '加急时间',
    dataIndex: 'urgentDate',
    key: 'urgentDate',
  },
  {
    title: '联系方式',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
]
export const ClueLogsCol = [
  {
    title: '日志类型',
    dataIndex: 'opTypeName',
    key: 'opTypeName',
  },
  {
    title: '时间',
    dataIndex: 'opTime',
    key: 'opTime',
  },
  {
    title: '处理人',
    dataIndex: 'opUserName',
    key: 'opUserName',
  },
  {
    title: '处理人职位',
    dataIndex: 'handlerPosition',
    key: 'handlerPosition',
  },
  {
    title: '处理人部门',
    dataIndex: 'handlerDepartment',
    key: 'handlerDepartment',
  },
  {
    title: '接收人',
    dataIndex: 'opUserName',
    key: 'opUserName',
  },
  {
    title: '接收人职位',
    dataIndex: 'recipientDepartment',
    key: 'recipientDepartment',
  },
  {
    title: '处理结果',
    dataIndex: 'opResult',
    key: 'opResult',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  },
]


