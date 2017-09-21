import React from 'react';

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

export default Toggle;