import React from 'react';
import {Table, message} from 'antd';
import {axiosClient} from '../tools/axiosClient.js'
import {getStarships} from '../tools/urls';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'

class StarWarsShips extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starWarsShips: [],
      loading: false,
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
          title: 'Hyperdrive Rating',
          dataIndex: 'hyperdrive_rating'
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
    this.getStarWarsShips(page);
  }

  getStarWarsShips = (page) => {
    this.props.showLoading();
    message.info(`Retrieving Star Wars Ships, page ${page || 1}`, .5)
    this.setState({
      loading: true
    }, () => {
      axiosClient.get(getStarships, {
        params: {
          page: page
        }
      }).then((response) => {
        this.setState({
          total: response.data.count,
          starWarsShips: response.data.results,
          loading: false,
          currentPage: page
        })
        this.props.hideLoading();
      }).catch((error) => {
        this.setState({
          loading: false
        })
        this.props.hideLoading();
      })
    })
  }

  componentDidMount() {
    this.getStarWarsShips();
  }

  render() {
    return (
      <div>
        {this.state.starWarsShips.length > 0 && (
          <Table
            dataSource={this.state.starWarsShips}
            columns={this.state.columns}
            bordered={true}
            scroll={{x: 700}}
            rowKey={record => record.url}
            expandedRowRender={ship => {
              return <div>
                <h4>Cargo capacity</h4>
                <p>{ship.cargo_capacity}</p>
                <h4>Consumables</h4>
                <p>{ship.consumables}</p>
                <h4>Cost in credits</h4>
                <p>{ship.cost_in_credits}</p>
                <h4>Crew</h4>
                <p>{ship.crew}</p>
                <h4>Starship Class</h4>
                <p>{ship.starship_class}</p>
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

export default connect(null, mapDispatchToProps)(StarWarsShips)