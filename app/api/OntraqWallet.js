import Base from './Base';

export default class OntraqWalletAPI extends Base {
  getTransactions = async id => {
    return this.sendRequest({
      path: `/api/v2/wallet/${id}`,
    });
  };
}
