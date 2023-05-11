
function Validator(options)
{
    var selectorRules = {};

    function validate(inputElement, rule) // thực hiện validate
    {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;

        var rules = selectorRules[rule.selector];

        console.log(rules);

        for (var i = 0; i < rules.length; ++i)
        {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    var formElement = document.querySelector(options.form);

    // console.log(options.rules);

    if(formElement)
    {
        formElement.onsubmit = function(e)
        {
            e.parentDefault();

            options.rules.forEach(function (rule)
            {
                  var inputElement = formElement.querySelector(rule.selector);
                  validate(inputElement,rule);
            });
        }
        options.rules.forEach(function (rule) 
        {
            //Lưu lại các rules cho mỗi input 
            // selectorRules[rule.selector] = rule.test;
            
            if(Array.isArray(selectorRules[rule.selector]))
            {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            } 

            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement)
            {
                inputElement.onblur = function()
                {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function ()
                {
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText ='';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }  
        });
    }
}
Validator.isID = function (selector)
{
    return {
        selector: selector,
        test: function(value)
        {
            var regexNumber = /^[0-9]+$/;
            return regexNumber.test(value) ? undefined : 'Mã người dùng phải là số';
        }
    }
}
Validator.isRequired = function (selector)
{
    return {
        selector: selector,
        test: function(value)
        {
            return value.trim() ? undefined : 'Vui lòng nhập ô này'
        }

    };

}
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là dạng của email';
        }
    };

}

Validator.isDiaChi = function (selector)
{
    return {
        selector: selector,
        test: function(value)
        {
            return value.trim() ? undefined : 'Bạn chưa nhập địa chỉ'
        }

    };

}
Validator.isLoai= function (selector)
{
    return {
        selector: selector,
        test: function(value)
        {
            return value ? undefined : 'Bạn chưa chọn loại người dùng'
        }

    };

}
//Xử lý submit
    formElement.onsubmit = function(event)
    {
        event.parentDefault();
        
    }

