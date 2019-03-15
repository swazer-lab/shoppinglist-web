const root = 'http://shopping.swazerlab.com/api/';

const rootWeb = 'http://localhost:3000/';

// Account Urls
const accountRoot = root.concat('account/');
export const register_url = accountRoot.concat('register');
export const login_url = accountRoot.concat('token');
export const confirm_email_url = accountRoot.concat('confirmEmail');
export const fetch_profile_url = accountRoot.concat('profile');
export const forgot_password_url = accountRoot.concat('ForgotPassword');
export const reset_password_url = accountRoot.concat('ResetPassword');

//Profile Urls
const profileRoot = root.concat('user/');
export const update_profile_photo_url = profileRoot.concat('updatePhoto');
export const update_profile_url = profileRoot.concat('update');
export const filter_contacts_url = profileRoot.concat('fetch');
export const get_photo_url = (photoId: number) => profileRoot.concat(`getPhoto?photoId=${photoId}`);

// Carts Urls
const cartRoot = root.concat('cart/');
const cartRootWeb = rootWeb.concat('cart/');

export const fetch_carts_url = cartRoot.concat('fetch');
export const create_cart_url = cartRoot.concat('create');
export const remove_cart_url = cartRoot.concat('remove');

export const get_access_to_cart_url = cartRoot.concat('getAccess');
export const get_access_to_cart_url_web = cartRootWeb.concat('getAccess');

export const share_cart_with_contacts_url = cartRoot.concat('shareCart');

// Items Urls
const itemRoot = root.concat('item/');
export const change_item_status_url = itemRoot.concat('changeStatus');

//Contacts
const contactRoot = root.concat('friend/');
export const fetch_contacts_url = contactRoot.concat('fetch');
export const add_contact_url = contactRoot.concat('add');
export const block_contact_url = contactRoot.concat('block');
