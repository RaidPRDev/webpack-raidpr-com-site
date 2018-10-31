
export default function AppPreloader(parent)
{
    console.log("AppPreloader.initialize");

    this.parentModule = parent;             // @RootObject
}

AppPreloader.prototype.initialize = function(elementID)
{
    if (elementID === undefined) elementID = '.percentage';

    // performance
    const perfData = window.performance.timing;
    const estimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
    const duration = ((estimatedTime / 1000) % 50) * 100;

    // percentage animation
    const percentageID = $(elementID);

    const start = 0;
    const end = 100;

    // start progress animation
    this.animateValue(percentageID, start, end, duration);

    const ref = this;

    if (this.parentModule.hasVisited)
    {
        setTimeout(function(){
            console.log("AppPreloader.TimeCompleted");

            ref.parentModule.appPreloaderComplete();
        }, duration);
    }
};

AppPreloader.prototype.animateValue = function(id, start, end, duration)
{
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const obj = $(id);

    let current = start;

    let timer = setInterval(function()
    {
        current += increment;
        $(obj).text('loading => ' + current);
        if (current == end)
        {
            $(obj).text('');
            clearInterval(timer);
        }
    }, stepTime);
};