import React from 'react';
import { insert } from '../../api/groups/methods.js';
import GroupRow from './group_row.jsx';

export default class GroupTable extends React.Component {
  constructor(props) {
    super(props);
    this.createGroup = this.createGroup.bind(this);
  }

  // REGION: Component Specifications

  render() {
    const { groups } = this.props;
    const formCreateGroup = !!Meteor.userId() ? (
      <div className="x_content">
        <br/>
        <form data-parsley-validate className="form-horizontal form-label-left" onSubmit={this.createGroup}>
          <div className="form-group">
            <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Group Name <span className="required">*</span>
            </label>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <input type="text" ref="name" name="name" required="required" className="form-control col-md-7 col-xs-12"/>
            </div>
            <button type="submit" className="btn btn-default">Create new group</button>
          </div>
        </form>
      </div>
    ) : null;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="x_panel">
            {formCreateGroup}
            <div className="x_title">
              <h2>Groups</h2>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <p>Simple table with group listing with players, situation and options</p>
              <table className="table table-bordered projects">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>Group</th>
                    <th>Players</th>
                    <th>Situation</th>
                    <th style={{ width: '20%' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map(g => <GroupRow group={g} key={g._id}/>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // REGION: Handlers

  createGroup(event) {
    event.preventDefault();
    const { router } = this.context;
    const groupId = insert.call({ name: this.refs.name.value }, err => {
      if (err) {
        alert(err.reason);
      } else {
        router.push(`/groups/${groupId}`);
      }
    });
  }
}

GroupTable.propTypes = {
  groups: React.PropTypes.array,
};

GroupTable.contextTypes = {
  router: React.PropTypes.object,
};
