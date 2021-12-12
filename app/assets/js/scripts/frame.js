/*
Dev Star
*/
//Load
const cp                      = require('child_process')
const crypto                  = require('crypto')
const {URL}                   = require('url')
const user_textt               = document.getElementById('user_textt')
const settings               = document.getElementById('settings_button')
const loggerFrame = LoggerUtil('%c[Frame]', 'color: #000668; font-weight: bold')
const ServerStatus            = require('./assets/js/serverstatus')

//Frame
const refreshServerStatus = async function(fade = false){
    loggerLanding.log('서버상태 새로고침 중')
    const serv = DistroManager.getDistribution().getServer(ConfigManager.getSelectedServer())

    let pLabel = 'SERVER'
    let pVal = 'OFFLINE'


    try {
        const serverURL = new URL('my://' + serv.getAddress())
        const servStat = await ServerStatus.getStatus(serverURL.hostname, serverURL.port)
        if(servStat.online){
            pVal = servStat.onlinePlayers
        }

    } catch (err) {
        loggerFrame.warn('서버상태 새로고침 실패')
        loggerFrame.error(err)
    }
    if(fade){
        $('#server_status_wrapper').fadeOut(250, () => {
            document.getElementById('player_count').innerHTML = pVal
            $('#server_status_wrapper').fadeIn(500)
        })
    } else {
        document.getElementById('player_count').innerHTML = pVal
    }
    
}

// Bind selected account
function updateSelectedAccount(authUser){
    let username = ''
    if(authUser != null){
        if(authUser.displayName != null){
            username = authUser.displayName
        }
        if(authUser.uuid != null){
            document.getElementById('avatar').style.backgroundImage = `url('https://cravatar.eu/helmavatar/${authUser.uuid}/32.png')`
        }
    }
    user_textt.innerHTML = username
}
updateSelectedAccount(ConfigManager.getSelectedAccount())
let AccountListener = setInterval(() => refreshServerStatus(), 60000)
let refreshServerStatusAuto = setInterval(() => updateSelectedAccount(ConfigManager.getSelectedAccount()), 300000)