import React from "https://unpkg.com/es-react@latest/dev/react.js";
import ReactDOM from "https://unpkg.com/es-react@latest/dev/react-dom.js";
import PropTypes from "https://unpkg.com/es-react@latest/dev/prop-types.js";
import htm from "https://unpkg.com/htm@latest?module";
const html = htm.bind(React.createElement);


fetch(new Request('members')).then(function(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}).then(data => init(data))
.catch(e => ReactDOM.render(html`<${ErrorBlock} error=${e} />`, document.getElementById("app")));


function init(data) {
  if (data.error !== false) {
    throw new Error(`API error! Status: ${data.error}`);
  } else {
    ReactDOM.render(
      html`<${App} data=${data.data} />`,
      document.getElementById("app")
    );
  }
}


function getAveragePriceFromMembers(data) {
  var numberOfMembers = data.length;
  return data
    .map(item => parseInt(item.subscription.price, 10))
    .reduce((prev, curr) => prev + curr) / numberOfMembers
}


const App = (props) => {
  const memberRows = props.data.sort(function(first, second) {
    return (first.subscription.price - second.subscription.price)
  })
  .reverse()
  .map(member => {
    return html`<${MemberRow} data=${member} key=${member.id}/>`
  });

  return html`
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Subscription Level</td>
        </tr>
      </thead>
      <tbody>
        ${memberRows}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2">
            Average subscription price: $${getAveragePriceFromMembers(props.data).toFixed(2)}
          </td>
        </tr>
      </tfoot>
    </table>
  `
}


const MemberRow = function(props) {
  return html`
    <tr>
      <td>${props.data.name}</td>
      <td>${props.data.subscription.name}</td>
    </tr>
  `
}


const ErrorBlock = function(props) {
  return html`
    <h2>${props.error.name}: ${props.error.message}</h2>
  `
}
