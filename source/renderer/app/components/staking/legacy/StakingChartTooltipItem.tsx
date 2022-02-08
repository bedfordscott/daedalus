import React, { Component } from 'react';
import { observer } from 'mobx-react';
// @ts-ignore ts-migrate(2307) FIXME: Cannot find module './StakingChartTooltipItem.scss... Remove this comment to see the full error message
import styles from './StakingChartTooltipItem.scss';

type Props = {
  value: string;
  label: string;
};

@observer
class StakingChartTooltipItem extends Component<Props> {
  render() {
    const { value, label } = this.props;
    return (
      <div className={styles.component}>
        <span className={styles.value}>{value}</span> {label}
      </div>
    );
  }
}

export default StakingChartTooltipItem;