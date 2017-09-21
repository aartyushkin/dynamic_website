import React from 'react';
import './App.css'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
import NewsPage from "./NewsPage/NewsPage"
import DancersPage from "./DancersPage/DancersPage";
import FriendsPage from "./FriendsPage/FriendsPage";
import LoginPage from "./LoginPage/LoginPage";

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    render () {
        return (
            <form className="search-form">
              <input
                  type="text"
                  placeholder="Search..."
                  value={this.props.filterText}
                  onChange={this.handleFilterTextInputChange}
              />
              <button>Search</button>
            </form>
        );
    }
}

class MenuItem extends React.Component {
    render() {
        return (
            <li><a className={this.props.className} href={this.props.href}>{this.props.itemName}</a></li>
        );
    }

}

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <div>
              <div onClick={this.handleClick} className="toggle-nav" href="#">&#9776;</div>
                {this.state.isToggleOn ? (
                    <ul>
                      <MenuItem className="toggle-nav" itemName="News" href="news"/>
                      <MenuItem className="toggle-nav" itemName="Dancers" href="dancers"/>
                      <MenuItem className="toggle-nav" itemName="Friends" href="friends"/>
                      <MenuItem className="toggle-nav" itemName="Login" href="login"/>
                    </ul>
                ) : (
                    '')
                }
            </div>
        );
    }
}



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

class MainPage extends React.Component {
    render () {
        return (
            <div className="main-page">
               <Profiles dancers={DANCERS} filterText={this.props.filterText} onChange={this.props.onChange}/>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: ''
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    render() {
        console.log(this.state.filterText);
        return(
        <div className="content">

            <Router>
                <div className="main-menu">
                    <Header />
                    <div className="col-sm-12">
                        <nav className="menu">
                            <ul className="active">
                                <li><Link to="/news">News</Link></li>
                                <li><Link to="/dancers">Dancers</Link></li>
                                <li><Link to="/friends">Friends</Link></li>
                                <li><Link to="/loginold">Login</Link></li>
                            </ul>
                            <SearchForm
                                filterText={this.state.filterText}
                                onFilterTextInput={this.handleFilterTextInput}
                            />
                            <Toggle/>
                        </nav>

                        <hr/>

                        <AuthButton/>

                        <hr/>

                        <Route exact path="/" component={() =>
                                <MainPage filterText={this.state.filterText} />
                            }
                        />
                        <Route path="/news" component={NewsPage}/>
                        <Route path="/dancers" component={ () =>
                                <DancersPage filterText={this.state.filterText} />
                            }
                        />
                        <PrivateRoute path="/friends" component={ () =>
                                <FriendsPage filterText={this.state.filterText} />
                            }
                        />
                        <Route path="/loginold" component={LoginPage}/>
                        <PrivateRoute path="/protected" component={Protected}/>
                        <Route path="/login" component={Login}/>
                    </div>
                </div>
            </Router>

        </div>
        );
    }
}

export default App;

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
};

const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
            fakeAuth.signout(() => history.push('/'))
        }}>Sign out</button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
));

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

const Protected = () => <h3>Protected</h3>;

class Login extends React.Component {
    state = {
        redirectToReferrer: false
    };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true })
        })
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
};

class Header extends React.Component{
    render () {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-11">
                        <a href="/"><img src="img/title.jpg" alt="Dancing couple"/></a>
                    </div>
                    <div className="col-sm-1">
                        <form className="app-header-login-form">
                            <p>Sign in</p>
                            <input className="app-header-username" type="text" placeholder="Enter Username" name="uname" required />
                            <input className="app-header-password" type="text" placeholder="Enter Password" name="password" required />
                            <button className="app-header-button">Enter</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}