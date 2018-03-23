import React from 'react';
import {Table, message} from 'antd';
import {axiosClient} from '../tools/axiosClient.js'
import {getPeople} from '../tools/urls';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {connect} from 'react-redux'

class StarWarsPeople extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starWarsPeople: [],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          width: 200,
        }, {
          title: 'Hair Color',
          dataIndex: 'hair_color'
        }, {
          title: 'Height',
          dataIndex: 'height'
        }, {
          title: 'Eye Color',
          dataIndex: 'eye_color'
        }, {
          title: 'Skin Color',
          dataIndex: 'skin_color'
        }],
      currentPage: 1,
      total: 0,
    }
  }

  onPageChange = (page) => {
    this.getStarWarsPeople(page);
  }

  getStarWarsPeople = (page) => {
    this.props.showLoading();
    message.info(`Retrieving Star Wars People, page ${page || 1}`, .5)
    axiosClient.get(getPeople, {
      params: {
        page: page
      }
    }).then((response) => {
      this.setState({
        total: response.data.count,
        starWarsPeople: response.data.results,
        currentPage: page
      })
      this.props.hideLoading();
    }).catch((error) => {
      this.props.hideLoading();
    })

  }

  componentDidMount() {
    this.getStarWarsPeople();
  }

  render() {
    return (
      <div>
        {this.state.starWarsPeople.length > 0 && (
          <Table
            dataSource={this.state.starWarsPeople}
            columns={this.state.columns}
            bordered={true}
            scroll={{x: 700}}
            expandedRowRender={person => {
              return <div>
                <h4>Birth Year</h4>
                <p>{person.birth_year}</p>
                <h4>Mass</h4>
                <p>{person.mass}</p>
                <h4>Gender</h4>
                <p>{person.gender}</p>
              </div>
            }}
            rowKey={record => record.url}
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

export default connect(null, mapDispatchToProps)(StarWarsPeople)