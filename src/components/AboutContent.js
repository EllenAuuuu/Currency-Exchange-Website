import"../styles/AboutContentStyle.css"

export default function AboutContent(){
    
    
    return(
        <div className="aboutcontainer">
            <div className="introduction">
                <h1 style={{marginBottom:'20px',textAlign:'center'}}>INTRODUCTION</h1>
                <p style={{marginBottom:'10px',marginLeft:'100px', marginRight:'100px'}}>
                     - We provide you to convert the real-time exchange rate between two 
                     different currencies and show the latest 100 data points historical currency .
                </p>
                <p style={{marginLeft:'100px', marginRight:'100px'}}>
                     - Our website choose the capabilities of two APIs to deliver accurate and
                      up-to-date information for your currency-related needs.
                </p>
            </div>        
            <div className="api"style={{marginTop:'30px'}}>
                <h1 style={{marginBottom:'20px',textAlign:'center'}}>
                    What API we use in this website?</h1>
                <h6 style={{ marginBottom: '10px', marginLeft: '120px' }}>
                    <a href="https://rapidapi.com/natkapral/api/currency-converter5/details">
                        Currency Converter (Click me)
                    </a>
                </h6>
                <p style={{marginBottom:'10px',marginLeft:'100px', marginRight:'100px'}}>
                        - This API supports 160+ currencies and is based on the data provided
                     by National Central Banks and markets. Rates are updated once an hour.
                </p>
                <p style={{marginBottom:'10px',marginLeft:'100px', marginRight:'100px'}}>
                        - Request limit: 100/day; Rate Limit: one request one second.
                </p>
                <h6 style={{ marginBottom: '10px', marginTop: '20px', marginLeft: '120px' }}>
                    <a href="https://www.alphavantage.co/documentation/">
                    Alpha Vantage (Click me)</a>
                </h6>
                <p style={{marginBottom:'10px',marginLeft:'100px', marginRight:'100px'}}>
                        - This API provides a comprehensive range of global stock APIs,
                         forex rates, and cryptocurrency data feeds.
                </p>
                <p style={{marginBottom:'10px',marginLeft:'100px', marginRight:'100px'}}>
                        - Request limit: 500/day; Rate Limit: five request one minute.
                </p>
            </div>
        </div>    
    )
}