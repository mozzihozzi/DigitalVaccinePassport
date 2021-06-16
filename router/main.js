module.exports = function(app)
{   
    // --- start page
    app.get('/',function(req,res){
        res.render('index.html');
    });

    // --- account page
    app.get('/account',function(req,res){
        res.render('account.html');
    });
	
	// --- institute page
    app.get('/account/institution',function(req,res){
        res.render('account-institution.html');
    });
    
    // --- user page
    app.get('/account/user',function(req,res){
        res.render('account-user.html');
    });

    // --- user qrcode page
    app.get('/user/qrcode',function(req,res){
        res.render('user-qrcode.html');
    });

    // --- user my page
    app.get('/user/mypage',function(req,res){
        res.render('user-mypage.html');
    });

    // --- institution my page
    app.get('/institution/mypage',function(req,res){
        res.render('institution-mypage.html');
    });

    // --- institution verification
    app.get('/institution/verification',function(req,res){
        res.render('institution-verification.html');
    });

}