import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapActionCreators, mapStateToProps } from '../../redux/store';
import { css } from 'emotion';
import Table, { TableBody, TableData, TableHead, TableHeadingData, TableRow } from '../../atoms/Table';
import { Loader } from '../../atoms/Loader';

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
        {isLoading ? <Loader /> : null}
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadingData>ID</TableHeadingData>
              <TableHeadingData>Name</TableHeadingData>
              <TableHeadingData>Age</TableHeadingData>
              <TableHeadingData>Vehicle</TableHeadingData>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              driversList.map((driver, index) => (
                <TableRow key={`driver-list-item-${index}`}>
                  <TableData>{driver.id}</TableData>
                  <TableData>{driver.name}</TableData>
                  <TableData>{driver.age}</TableData>
                  <TableData>{driver.vehicle}</TableData>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
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
