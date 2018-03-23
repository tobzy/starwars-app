import React from 'react';
import {Table, message} from 'antd';
import {axiosClient} from '../tools/axiosClient.js'
import {getPlanets} from '../tools/urls';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'

class StarWarsPlanets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starWarsPlanets: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          width: 200,
        }, {
          title: 'Population',
          dataIndex: 'population'
        }, {
          title: 'Terrain',
          dataIndex: 'terrain'
        }, {
          title: 'Climate',
          dataIndex: 'climate',
        }, {
          title: 'Rotation Period',
          dataIndex: 'rotation_period',
        }],
      currentPage: 1,
      total: 0,
    }
  }

  onPageChange = (page) => {
    this.getStarWarsPlanets(page);
  }

  getStarWarsPlanets = (page) => {
    this.props.showLoading();
    message.info(`Retrieving Star Wars Planets, page ${page || 1}`, .5)
      axiosClient.get(getPlanets, {
        params: {
          page: page
        }
      }).then((response) => {
        this.setState({
          total: response.data.count,
          starWarsPlanets: response.data.results,
          currentPage: page
        })
        this.props.hideLoading();
      }).catch((error) => {
        this.props.hideLoading();
      })

  }

  componentDidMount() {
    this.getStarWarsPlanets();
  }

  render() {
    return (
      <div>
        {this.state.starWarsPlanets.length > 0 && (
          <Table
            dataSource={this.state.starWarsPlanets}
            columns={this.state.columns}
            bordered={true}
            scroll={{x: 700}}
            rowKey={record => record.url}
            expandedRowRender={planet => {
              return <div>
                <h4>Gravity</h4>
                <p>{planet.gravity}</p>
                <h4>Orbital Period</h4>
                <p>{planet.orbital_period}</p>
                <h4>Diameter</h4>
                <p>{planet.diameter}</p>
                <h4>Surface Water</h4>
                <p>{planet.surface_water}</p>
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

export default connect(null, mapDispatchToProps)(StarWarsPlanets)