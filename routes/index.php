<?php
header("Content-Type: application/javascript");
header("X-Content-Type-Options: nosniff");
header("Content-Type: application/javascript; X-Content-Type-Options: nosniff;");

$allowedExtensions = array('html');
function filemtime_r($path){
    global $allowedExtensions;
    if (!file_exists($path))
        return 0;
	$tmp = explode(".", $path);
    $extension = end($tmp);
    if (is_file($path) && in_array($extension, $allowedExtensions))
        return filemtime($path);
    $ret = 0;
	foreach (glob($path."/*") as $fn){
		if (filemtime_r($fn) > $ret)
			$ret = filemtime_r($fn);
	}
    return $ret;
}
$template = filemtime_r('../pages/');
?>
var routes = [
    // Index page
    {
        path: "/",
        componentUrl: "./pages/home.html?v=<?php echo $template;?>",
        name: "home"
    },

	{
        path: "/header",
        componentUrl: "./pages/header.html?v=<?php echo $template;?>"
    },
	{
        path: "/footer",
        componentUrl: "./pages/footer.html?v=<?php echo $template;?>"
    },

	{
        path: "/account",
        componentUrl: "./pages/user/profile.html?v=<?php echo $template;?>"
    },
	{
        path: "/login",
        componentUrl: "./pages/user/login.html?v=<?php echo $template;?>",
		name: "login",
		options: {
			animate: false,
		}
    },
    {
        path: "/code",
        componentUrl: "./pages/user/code.html?v=<?php echo $template;?>",
        name: "code",
        options: {
            animate: false,
        }
    },
	{
        path: "/signup",
        componentUrl: "./pages/user/signup.html?v=<?php echo $template;?>",
		name: "signup",
		options: {
			animate: false,
		}
    },
	{
        path: "/logout",
        componentUrl: "./pages/user/logout.html?v=<?php echo $template;?>",
		name: "logout",
		options: {
			animate: false,
		}
    },
	{
        path: "/recovery",
        componentUrl: "./pages/user/recovery.html?v=<?php echo $template;?>",
		name: "recovery",
		options: {
			animate: false,
		}
    },
    {
        path: "/main",
        componentUrl: "./pages/main.html?v=<?php echo $template;?>",
        name: "main"
    },
    {
        path: "/select-city",
        componentUrl: "./pages/select_city.html?v=<?php echo $template;?>",
        name: "select_city"
    },
    {
        path: "/select-subscription",
        componentUrl: "./pages/select_subscription.html?v=<?php echo $template;?>",
        name: "select_subscription"
    },
    {
        path: "/page-no-city",
        componentUrl: "./pages/page_no_city.html?v=<?php echo $template;?>",
        name: "page_no_city"
    },
    {
        path: "/success-save-email",
        componentUrl: "./pages/success_save_email.html?v=<?php echo $template;?>",
        name: "success_save_email"
    },
	{
        path: "/subscription",
        componentUrl: "./pages/subscription/info.html?v=<?php echo $template;?>",
		name: "subscription"
    },
	{
        path: "/subscribing",
        componentUrl: "./pages/subscription/subscribing.html?v=<?php echo $template;?>",
		name: "subscribing"
    },
<!--	{-->
<!--        path: "/nosub",-->
<!--        componentUrl: "./pages/subscription/nosub.html?v=--><?php //echo $template;?><!--",-->
<!--		name: "nosub"-->
<!--    },-->
<!--	{-->
<!--        path: "/promo",-->
<!--        componentUrl: "./pages/promo/promo.html?v=--><?php //echo $template;?><!--",-->
<!--		name: "promo"-->
<!--    },-->
<!---->
<!--	{-->
<!--        path: "/services",-->
<!--        componentUrl: "./pages/services/services.html?v=--><?php //echo $template;?><!--",-->
<!--		name: "services"-->
<!--    },-->
    {
        path: "/qrcode",
        componentUrl: "./pages/qr_code/qrcode.html?v=<?php echo $template;?>",
        name: "qrcode"
    },
    {
        path: "/qrcode-auth",
        componentUrl: "./pages/qr_code/auth.html?v=<?php echo $template;?>",
        name: "qrcode_auth"
    },
    {
        path: "/qrcode-found",
        componentUrl: "./pages/qr_code/found.html?v=<?php echo $template;?>",
        name: "qrcode_found"
    },
    {
        path: "/qrcode-success",
        componentUrl: "./pages/qr_code/success.html?v=<?php echo time();?>",
        name: "qrcode_success"
    },
    {
        path: "/qrcode-pet-no-missing",
        componentUrl: "./pages/qr_code/pet_not_missing.html?v=<?php echo time();?>",
        name: "qrcode_pet_not_missing"
    },




<!--	{-->
<!--        path: "/uikit",-->
<!--        componentUrl: "./pages/uikit.html?v=--><?php //echo $template;?><!--",-->
<!--		options: {-->
<!--			animate: false,-->
<!--		},-->
<!--		on: {-->
<!--			pageInit: function (e, page) {-->
<!--				app.store.state.menu = 'uikit';-->
<!--				app.views[0].router.refreshPage();-->
<!--			},-->
<!--		}-->
<!--    },-->
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
