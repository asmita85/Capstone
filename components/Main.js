// import {
//   Home,
//   MenProduct,
//   WomenProduct,
//   KidProduct,
//   ProductDetail,
//   Cart,
//   Account,
//   Contact
// } from "./views";
// export default () => `
// ${Men()}
// `;

import * as views from "./views";
export default st => `
${views[st.page]()}
`;
