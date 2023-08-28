import request from '@/utils/axios-request';
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
export function getbusinessLineInfos(data){
  return request({
    method: 'get',
    url: '/api/account',
    params:data,
  });
}

// 2-线索来源：
export function getClewSourceByBusinessType(type){
  return request({
    method: 'get',
    url: '/api/clews/getClewSourceByBusinessType',
    data:{
      businessType:type
    },
  });
}
// 3-产品线 productLineCode,productLineName
export function getProductLine(){
  return request({
    method: 'get',
    url: '/api/productLine',
    data:{
      pageSize:1000
    },
  });
}
// 4-行业
export function getIndustryList(){
  return request({
    method: 'get',
    url: '/api/basic/selectAllList',
  });
}
// 5-地区：getAreas
export function getAreas(){
  return request({
    method: 'get',
    url: '/api/basic/all/areas',
  });
}

//表单提交
export function clewsSubmit(data){
  return request({
    method: 'post',
    url: '/api/clews',
    data:{
      clewInfo:data,
      inputType:1
    }
  });
}

// 后续放到模拟请求里
export const tabList = [
  {
    key: 'intoCluesLibrary',
    tab: '新建至线索库',
  },
  {
    key: 'intoISCommon',
    tab: '新建至IS公海',
  },
  {
    key: 'intoISPrivate',
    tab: '新建至IS私海',
  },
  {
    key: 'intoShopCommon',
    tab: '新建至到店公海',
  },
  {
    key: 'intoShopPrivate',
    tab: '新建至到店私海',
  },
  {
    key: 'intoCustomer',
    tab: '新建至客户(含业务)',
  },
  {
    key: 'intoAD',
    tab: '新建至广告(线索)',
  },
  {
    key: 'intoADPrivate',
    tab: '新建至广告私海',
  },
]; 

