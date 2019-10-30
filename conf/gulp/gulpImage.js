
var gulp = require('gulp');


module.exports = function( options ){

	var filesArr = options.filesArr;

	var imgArr = [];

	if( filesArr.length == 0){
		//打包所有文件
		imgArr.push('src/**/img/**/*');
	}
	else{
		//filesArr不为空，需要打包对应项目里的文件
		for( var imgArr = [], i = 0; i < filesArr.length; i++){
			imgArr.push( filesArr[i] + '**/img/**/*');
			imgArr.push( 'src/common/**/img/**/*');
		}	
	}

	
	//common里的图片打出到commonResources里
	gulp.task('commonImages', function() {

	    return gulp.src( ['common/**/*.png' , 'common/**/*.jpg' ,'common/**/*.svg'], {base:'common/'})

	    	// .pipe( plugins.rename(function(path){
	    	// 	//如果图片是common中的
	    	// 	path.dirname = path.dirname.replace(/\.\.\\/, '');	    	
	    	// }))
	    	
	        .pipe(gulp.dest(options.path + 'commonResources/common/'));
	});

	//图片打包任务，全部打包和单独打包可共用
	gulp.task('images', ['commonImages'], function() {

	    return gulp.src( imgArr , {base:'src'})

	    	// .pipe( plugins.rename(function(path){
	    	// 	//如果图片是common中的
	    	// 	if( path.dirname.indexOf('..\\common\\') != -1){
	    	// 		path.dirname = path.dirname.replace(/\.\.\\/, '');
	    	// 	}	    	
	    	// }))
	    	
	        .pipe(gulp.dest(options.path));
	});
	
}