import React from 'react';
import { message } from 'antd';
import { inject, observer } from 'mobx-react';
import { history } from 'umi';
import { setCookie } from '@/utils/cookie';
import { ssoUrl, host } from './config';
import styles from './index.less';
import request from '@/utils/axios-request';

@inject('basicStore')
@observer
export default class Login extends React.PureComponent<routerProps, defaultState> {
  messageHandler = async (e: any) => {
    if (e.origin === ssoUrl) {
      if (e.data.op === 'forgetPWD') {
        window.location.href = 'https://cas.hsmob.com/#/forget_pwd';
      }

      if (e.data.op === 'redirect' && e.data.ticket) {
        const {
          data: { code = '', data = { username: '' } },
        } = await request(`/api/account?ticket=${e.data.ticket}`);

        if (code === 0) {
          const { query } = this.props.location;
          let { redirect = '/' } = query!;
          if (redirect!.includes('/user/login')) redirect = '/';

          this.saveUserInfo(data);
          setCookie('ssoTicket', e.data.ticket);
          localStorage.setItem('ticket', e.data.ticket);
          history.push(redirect as string);
        } else {
          console.log('服务端与sso验证登录失败');
          message.warning('登录失败，请重试！');
        }
      }
    }
  };

  saveUserInfo = (payload: any): void => {
    const { basicStore } = this.props;

    basicStore.setUser(payload);

    localStorage.setItem('currentUser', JSON.stringify(payload));
    localStorage.setItem('permissions', JSON.stringify(payload.visualPermissions));
  };

  componentDidMount() {
    window.addEventListener('message', this.messageHandler, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.messageHandler, false);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <iframe
            width="100%"
            height="100%"
            src={`${ssoUrl}/cas/iframe_login/?service=${host}#/login_form`}
            allowTransparency={true}
            frameBorder="no"
          />
        </div>
      </div>
    );
  }
}
