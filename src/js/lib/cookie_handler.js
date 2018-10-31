export default function CookieHandler(parent)
{
    this.parentModule = parent;             // @Object

    this.initialize();
}

CookieHandler.prototype.initialize = function(isReset)
{
    console.log("CookieHandler.initialize");

    this.domain = "raidpr.";

    if (isReset) this.resetCookie(this.domain + 'home', 'no', 0);
};

CookieHandler.prototype.checkCookie = function(page)
{
    console.log("CookieHandler.checkCookie");

    // page = name of pages, ex: home, about, contact
    if (page === undefined) page = "home";

    const propName = this.domain + page;

    let visitState = this.getCookie(propName);
    if (visitState !== "" && visitState == "yes") {
        console.log("CookieHandler[ Has visited before: ", propName, " visitedState: ", visitState, ' ]');

        return true;

    } else {
        console.log("CookieHandler[ No cookies found, setting... ]");
        visitState = "yes";
        if (visitState !== "" && visitState != null)
        {
            console.log("CookieHandler[ Saving prop: ", propName, " visitedState: ", visitState, ' ]');

            this.setCookie(propName, visitState, 365);
        }
    }

    return false;
};

CookieHandler.prototype.setCookie = function(cname, cvalue, exdays)
{
    console.log("CookieHandler.setCookie");

    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

CookieHandler.prototype.getCookie = function(cname)
{
    console.log("CookieHandler.getCookie");

    const name = cname + "=";
    const ca = document.cookie.split(';');

    for(let i = 0; i < ca.length; i++)
    {
        let c = ca[i];

        while (c.charAt(0) === ' ')
        {
            c = c.substring(1);
        }

        if (c.indexOf(name) === 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

CookieHandler.prototype.resetCookie = function(cname, cvalue, exdays)
{
    console.log("CookieHandler.setCookie");

    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
