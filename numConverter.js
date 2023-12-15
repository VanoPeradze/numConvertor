function convertNumber() {
    var inputNum = document.getElementById("inputNumber").value;
    var inputBase = document.getElementById("inputBase").value;
    var outputBase = document.getElementById("outputBase").value;

    var result = document.getElementById("result");
    var process = document.getElementById("process");

    // Check if the conversion is for IP addresses
    if (inputBase === 'ip' || outputBase === 'ip') {
        if (inputBase === 'ip' && outputBase === '2') {
            // Convert IP address to binary
            var binaryIP = ipToBinary(inputNum);
            result.innerHTML = binaryIP;
            process.innerHTML = "IP address converted to binary.";
        } else if (inputBase === '2' && outputBase === 'ip') {
            // Convert binary to IP address (if needed)
            var ip = binaryToIp(inputNum);
            result.innerHTML = ip;
            process.innerHTML = "Binary converted to IP address.";
        } else {
            result.innerHTML = "Invalid conversion for IP addresses.";
            process.innerHTML = "";
        }
    } else {
        // Your existing conversion logic for other number bases
        var processSteps = "";
        var decimalNumber = parseInt(inputNum, inputBase);

        if (inputBase !== '10') {
            processSteps += "<span class='base-conversion'>(" + inputNum + ")<sub>" + inputBase + "</sub> = ";
            var digits = inputNum.split('');
            var exponent = digits.length - 1;

            for (var i = 0; i < digits.length; i++) {
                var term = "(" + digits[i] + " × 2<span class='exponent'>" + exponent + "</span>)";
                processSteps += term;
                
                if (i < digits.length - 1) {
                    processSteps += " + ";
                }
                
                exponent--;
            }
            processSteps += " = (" + decimalNumber + ")<sub>10</sub></span>";
        } else {
            processSteps += "No conversion needed for base 10.";
        }

        var outputNumber = decimalNumber.toString(outputBase);
        result.innerHTML = outputNumber.toUpperCase();
        process.innerHTML = processSteps;
    }

    var resultContainer = document.getElementById("resultCont");
    var processContainer = document.getElementById("processCont");
    resultContainer.style.display = "block";
    processContainer.style.display = "block";
    resultContainer.style.color = "white";
    processContainer.style.color = "white";
}

// Function to convert IP address to binary
function ipToBinary(ip) {
    return ip.split('.').map(function(octet) {
        return parseInt(octet).toString(2).padStart(8, '0');
    }).join('.');
}

// Function to convert binary to IP address (if needed)
function binaryToIp(binary) {
    return binary.split('.').map(function(bits) {
        return parseInt(bits, 2).toString(10);
    }).join('.');
}