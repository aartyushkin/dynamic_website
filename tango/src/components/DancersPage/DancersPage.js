import React from 'react';

class Profile extends React.Component {
    render () {
        return (
            <div className="col-sm-6 col-md-3 col-wd-2">
                <div className="col"><img src={this.props.image} alt={this.props.name}/>{this.props.name} <br/> {this.props.start_date}</div>
            </div>
        );
    }
}

class Profiles extends React.Component {
    render () {
        let profiles = [];
        this.props.dancers.forEach((dancer) => {
            if (dancer.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
                return;
            }
            profiles.push(
                <Profile key={dancer.id} image={dancer.image} name={dancer.name} start_date={dancer.start_date}/>
            );
        });

        return (
            <div className="row">
                {profiles}
            </div>
        );
    }
}

let DANCERS = [
    {id:1, name: 'Ann', start_date: '01.08.2015', image:"img/dancer1.jpg"},
    {id:2, name: 'Kate', start_date: '01.07.2017', image:"img/dancer2.jpg"},
    {id:3, name: 'Richard', start_date: '01.08.2016', image:"img/dancer3.jpg"},
    {id:4, name: 'Daniel', start_date: '01.02.2017', image:"img/dancer4.jpg"},
    {id:5, name: 'Simon', start_date: '01.08.2010', image:"img/dancer5.jpg"},
    {id:6, name: 'Karen', start_date: '01.08.2012', image:"img/dancer6.jpg"},
    {id:7, name: 'Patricia', start_date: '13.08.2017', image:"img/dancer7.jpg"},
    {id:8, name: 'Peter', start_date: '01.11.2016', image:"img/dancer8.jpg"}
];

class DancersPage extends React.Component {
    render () {
        return (
            <div className="main-page">
                <Profiles dancers={DANCERS} filterText={this.props.filterText} onChange={this.props.onChange}/>
            </div>
        );
    }
}

export default DancersPage;