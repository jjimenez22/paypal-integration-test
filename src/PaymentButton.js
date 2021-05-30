import React from "react";
import ReactDOM from "react-dom"
import scriptLoader from "react-async-script-loader";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID

let PayPalButton

class PaymentButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showButtons: false,
            loading: true,
            paid: false
        };

        window.React = React;
        window.ReactDOM = ReactDOM;
    }

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;

        if (isScriptLoaded && isScriptLoadSucceed) {
            PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
            this.setState({ loading: false, showButtons: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

        const scriptJustLoaded =
            !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

        if (scriptJustLoaded) {
            if (isScriptLoadSucceed) {
                PayPalButton = window.paypal.Buttons.driver("react", {
                    React,
                    ReactDOM
                });
                this.setState({ loading: false, showButtons: true });
            }
        }
    }

    createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "0.01",
                    },
                },
            ],
        });
    }

    onApprove(data, actions) {
        return actions.order.capture().then(details => {
            const paymentData = {
                payerID: data.payerID,
                orderID: data.orderID
            };
            console.log("Payment Approved: ", paymentData);
            console.log("Details", details);
            this.setState({ showButtons: false, paid: true });
        });
    }

    render() {
        const { showButtons, loading, paid } = this.state;

        return (
            <div className="main">
                {loading && <p>Loading...</p>}

                {showButtons && (
                    <div>
                        <div>
                            <h2>Items: Mercedes G-Wagon</h2>
                            <h2>Total checkout Amount $200</h2>
                        </div>

                        <PayPalButton
                            createOrder={(data, actions) => this.createOrder(data, actions)}
                            onApprove={(data, actions) => this.onApprove(data, actions)}
                        />
                    </div>
                )}

                {paid && (
                    <div className="main">
                        <h2>
                            Congrats! you just paid for that picture. Work a little harder and
                            you'll be able to afford the car itself
                        </h2>
                    </div>
                )}
            </div>
        );
    }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}`)(PaymentButton)
