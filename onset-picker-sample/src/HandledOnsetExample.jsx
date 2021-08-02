import React from 'react';
import moment from 'moment';
import OnsetPicker from 'terra-clinical-onset-picker';
import { injectIntl } from 'react-intl';

class HandledOnsetExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      precision: 'before',
      granularity: 'year',
      onsetDate: moment().subtract(2, 'years').format('YYYY-MM-DD'),
    };

    this.handleOnset = this.handleOnset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnset(onsetObject) {
    this.setState({
      precision: onsetObject.precision,
      granularity: onsetObject.granularity,
      onsetDate: onsetObject.onsetDate,
      ageUnit: onsetObject.ageUnit,
    });
  }

  handleSubmit(e) {
   e.preventDefault();
    this.setState(prevState => ({
      submittedData: {
        precision: prevState.precision,
        granularity: prevState.granularity,
        onsetDate: prevState.onsetDate,
        ageUnit: prevState.ageUnit,
      },
    }));
  }

  render() {
    const birthdate = 'edfcb'
    return (
      <form onSubmit={this.handleSubmit}>
        <OnsetPicker
          birthdate={birthdate}
          granularity= 'month'
          id="doogs-supplied"
          precision={this.state.precision}
          precisionSet={[
            'unknown',
            'after',
            'before',
            'on/at',
          ]}
          onsetDate={this.state.onsetDate}
          legend="Date of Onset"
          onsetOnChange={this.handleOnset}
        />
        <button type="submit">Submit</button>
        {this.state.submittedData && (
          <div>
            <hr />
            <p>Form was submitted with</p>
            <p>{JSON.stringify(this.state.submittedData, null, 2)}</p>
          </div>
        )}
      </form>
    );
  }
}

export default injectIntl( HandledOnsetExample);