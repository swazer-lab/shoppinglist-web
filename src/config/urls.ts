const root = process.env.NODE_ENV === 'development' ? 'http://localhost:63493/api/' : 'http://shopping.swazerlab.com/api/';
const rootWeb = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'http://shoppingweb.swazerlab.com/';

// Account Urls
const accountRoot = root.concat('account/');
export const register_url = accountRoot.concat('register');
export const external_login_url = accountRoot.concat('registerExternal');
export const login_url = accountRoot.concat('token');
export const confirm_email_url = accountRoot.concat('confirmEmail');
export const update_password_url = accountRoot.concat('changePassword');
export const resend_confirm_email_url = (userId: string) => accountRoot.concat(`resendConfirmEmail?userId=${userId}`);
export const fetch_profile_url = accountRoot.concat('profile');
export const forgot_password_url = accountRoot.concat('ForgotPassword');
export const reset_password_url = accountRoot.concat('ResetPassword');

//Profile Urls
const profileRoot = root.concat('user/');
export const update_profile_photo_url = profileRoot.concat('updatePhoto');
export const delete_profile_photo_url = profileRoot.concat('deletePhoto');
export const update_profile_url = profileRoot.concat('update');
export const filter_contacts_url = profileRoot.concat('fetch');
export const get_photo_url = (photoId: number) => profileRoot.concat(`getPhoto?photoId=${photoId}`);

// Carts Urls
const cartRoot = root.concat('cart/');
const cartRootWeb = rootWeb.concat('cart/');

export const fetch_carts_url = cartRoot.concat('newfetch');
export const search_carts_url = cartRoot.concat('getCarts');
export const create_cart_url = cartRoot.concat('create');
export const remove_cart_url = cartRoot.concat('remove');
export const fetch_archive_cart_url = cartRoot.concat('getArchivedCarts');

export const get_access_to_cart_url = cartRoot.concat('getAccess');
export const get_access_to_cart_url_web = cartRootWeb.concat('getAccess');

export const share_cart_with_contacts_url = cartRoot.concat('shareCart');

export const update_order_url = cartRoot.concat('updateOrder');

export const make_archived_url = cartRoot.concat('makeArchived');

// Items Urls
const itemRoot = root.concat('item/');
export const change_item_status_url = itemRoot.concat('changeStatus');

//Contacts
const contactRoot = root.concat('friend/');
export const fetch_contacts_url = contactRoot.concat('fetch');
export const add_contact_url = contactRoot.concat('add');
export const block_contact_url = contactRoot.concat('block');
