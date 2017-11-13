const {BrowserWindow} = require('electron');
const {app} = require('electron');
var path = require('path');

app.on('ready', () => {
  const browserWindow = new BrowserWindow({width: 800,
                                           height: 800,
                                           icon: path.join(__dirname, 'assets/icons/png/200x200.png'),
                                           backgroundColor: '#80D9FF',
                                          });
  browserWindow.loadURL(`file://${__dirname}/browser.html`);

  const menuTemplate = [
    {
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Cmd+Q',
          click() {
            app.quit();
          }
        }
      ]
    }, {
      label: 'Edit',
      submenu: [
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        }, {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }, {
          label: 'Search in File',
          accelerator: 'CmdOrCtrl+F',
          click() {
            browserWindow.webContents.send('toggleSearch')
          }
        }
      ]
    }, 
      {
      label: 'Debug',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator: (function() {
            if (process.platform == 'darwin')
              return 'Alt+Command+I';
            else
              return 'Ctrl+Shift+I';
          })(),
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
  ];

  const {Menu} = require('electron');
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
