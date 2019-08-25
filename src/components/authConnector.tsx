import React from 'react'
import {Redirect} from "./redirect";
import { ReperioCoreConnector } from '../services/connector';
import { User } from '../models/user';

interface Props {
    url: string;
    loginUrl?: string;
    redirectToLogin?: boolean;
    reperioCoreConnector: ReperioCoreConnector;
    setLoggedInUser: (user: User) => any;
}

interface State {
    isInitialized: boolean;
    redirectToLogin: boolean;
}

export class AuthConnector extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isInitialized: false,
            redirectToLogin: false
        };
    }

    async componentDidMount() {
        
        try {
            const user = await this.props.reperioCoreConnector.authService.getLoggedInUser();
            this.props.setLoggedInUser(user);
            this.setState({
                isInitialized: true,
                redirectToLogin: false
            });
        } catch {
            this.setState({
                isInitialized: true,
                redirectToLogin: true
            });
        }
    }

    render() {
        if (!this.state.isInitialized) {
            return null;
        }

        const redirectToLogin = this.state.redirectToLogin || this.props.redirectToLogin;
        if (redirectToLogin) {
            if (this.props.loginUrl == null) {
                return null;
            } else {
                return <Redirect url={this.props.loginUrl} />
            }
        } else {
            return this.props.children;
        }
    }
}