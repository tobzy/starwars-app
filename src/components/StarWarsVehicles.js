import React from 'react';
import {Table, message} from 'antd';
import {axiosClient} from '../tools/axiosClient.js'
import {getVehicles} from '../tools/urls';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'

class StarWarsVehicles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starWarsVehicles: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          // fixed: 'left',
          width: 200,
        }, {
          title: 'Passengers',
          dataIndex: 'passengers'
        }, {
          title: 'Vehicle Class',
          dataIndex: 'vehicle_class'
        }, {
          title: 'Model',
          dataIndex: 'model',
        }, {
          title: 'Manufacturer',
          dataIndex: 'manufacturer',
        }],
      currentPage: 1,
      total: 0,
    }
  }

  onPageChange = (page) => {
    this.getStarWarsVehicles(page);
  }

  getStarWarsVehicles = (page) => {
    this.props.showLoading();
    message.info(`Retrieving Star Wars Vehicles, page ${page || 1}`, .5)
      axiosClient.get(getVehicles, {
        params: {
          page: page
        }
      }).then((response) => {
        this.setState({
          total: response.data.count,
          starWarsVehicles: response.data.results,
          currentPage: page
        })
        this.props.hideLoading();
      }).catch((error) => {
        this.props.hideLoading();
      })
  }

  componentDidMount() {
    this.getStarWarsVehicles();
  }

  render() {
    return (
      <div>
        {this.state.starWarsVehicles.length > 0 && (
          <Table
            dataSource={this.state.starWarsVehicles}
            columns={this.state.columns}
            bordered={true}
            scroll={{x: 700}}
            rowKey={record => record.url}
            expandedRowRender={vehicle => {
              return <div>
                <h4>Cargo capacity</h4>
                <p>{vehicle.cargo_capacity}</p>
                <h4>Consumables</h4>
                <p>{vehicle.consumables}</p>
                <h4>Cost in credits</h4>
                <p>{vehicle.cost_in_credits}</p>
                <h4>Crew</h4>
                <p>{vehicle.crew}</p>
              </div>
            }}
            pagination={{
              total: this.state.total,
              defaultCurrent: 1,
              current: this.state.currentPage,
              onChange: this.onPageChange,
              pageSize: 10
            }}
          />
        )}
      </div>

    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(showLoading()),
    hideLoading: () => dispatch(hideLoading()),
  }
}

export default connect(null, mapDispatchToProps)(StarWarsVehicles)