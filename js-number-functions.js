//modified from http://stackoverflow.com/a/149099/806777
Number.prototype.toMoney = function (maxPrecision) { // -1234.56 -> ($1,234.56)
	maxPrecision = maxPrecision || 2;
	maxPrecision = (maxPrecision > 20 ? 20 : (maxPrecision < 0 ? 0 : maxPrecision));
	var n = Math.abs(this);
	n = n.toClean(maxPrecision, 2);
	n = n.replace(/\d(?=(\d{3})+\.)/g, "$&,");
	return (this < 0 ? "(" : "") + "$" + n + (this < 0 ? ")" : "");
};
Number.prototype.toClean = function (maxPrecision, minPrecision) {// 1.500000 -> 1.5; 1.0000 -> 1
	maxPrecision = maxPrecision || 20;
	maxPrecision = (maxPrecision > 20 ? 20 : (maxPrecision < 0 ? 0 : maxPrecision));
	minPrecision = minPrecision || 0;
	minPrecision = (minPrecision < 0 ? 0 : (minPrecision > 20 ? 20 : minPrecision));
	if (minPrecision > maxPrecision) {
		var temp = maxPrecision;
		maxPrecision = minPrecision;
		minPrecision = temp;
	}
	var n = this;

	//limit to maxPrecision
	if (n % 1 !== 0) {
		n = n.toFixed(maxPrecision);
		n = String(n).replace(/\.?0*$/, "");
	} else {
		n = n.toFixed();
	}

	//limit to minPrecision
	if (minPrecision > 0) {
		var numZeros;
		var dotIndex = n.indexOf(".");
		if (dotIndex > -1) {
			numZeros = minPrecision - (n.length - dotIndex - 1);
		} else {
			numZeros = minPrecision;
			n += ".";
		}
		for (var i = 0; i < numZeros; i++) {
			n += "0";
		}
	}

	return n;
};
Number.prototype.toNumber = function () {
	return new Number(this);
};
Number.prototype.toClosest = function (number) {
	var remainder = this % number;
	var n = this - remainder;
	if(remainder >= number / 2){
		n += number;
	}
	return n.toNumber();
};

String.prototype.toMoney = function (maxPrecision) {
	return this.toNumber().toMoney(maxPrecision);
};
String.prototype.toFixed = function (precision) {
	return this.toNumber().toFixed(precision);
};
String.prototype.toClean = function (maxPrecision, minPrecision) {
	return this.toNumber().toClean(maxPrecision, minPrecision);
};
String.prototype.toNumber = function () {
	return new Number(this.replace(/[^\d\.]|\.(?=.*\.)/g, ""));//remove all except digits and last dot
};
String.prototype.toClosest = function (number) {
	return this.toNumber().toClosest(number);
};
