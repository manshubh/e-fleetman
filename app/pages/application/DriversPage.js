import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapActionCreators, mapStateToProps } from '../../redux/store';
import { css } from 'emotion';
import { Button } from '../../atoms/Button';

const { wrapper, table } = getStyles();
class DriversPageComponent extends Component {

  componentWillMount() {
    this.loadData();
  }

  loadData = async () => {
    this.props.driverActions.loadDrivers();
  }


  render() {
    const { drivers: { driversList = [], isLoading } } = this.props;
    return (
      <div className={wrapper}>
        {isLoading ? <div>Loading...</div> : null}
        <table className={table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Vehicle</th>
            </tr>
          </thead>
          <tbody>
            {
              driversList.map((driver, index) => (
                <tr key={`____driver____${index}____`}>
                  <td>{driver.id}</td>
                  <td>{driver.name}</td>
                  <td>{driver.age}</td>
                  <td>{driver.vehicle}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function getStyles() {
  return {
    wrapper: css(`
      display: flex;
      flex-direction: column;
      padding: 1em;
    `),
    table: css(`
      text-align: left;
    `)
  }
}

export const DriversPage = connect(mapStateToProps, mapActionCreators)(DriversPageComponent);
