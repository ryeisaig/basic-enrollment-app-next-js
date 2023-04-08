import theme from '@/config/theme';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const pages = ['students', 'courses', 'subjects'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{background: "#fff", color: theme.palette.primary.main}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src="logo.png"/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              marginLeft: '15px'
            }}
          >
            LUNA COLLEGES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                href={`/${page}`}
                sx={{ my: 2, color: 'inherit', display: 'block', fontSize: '14px' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBIVEhgVFRIYGBgZGBgYGBoYGBgYGRgYGhgaGhgYGRgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQrJCE0NDQ0NDQxNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQxND00NDQ0NP/AABEIAPAA0gMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwEEBQAGBwj/xAA7EAACAQIEAwUGBAUDBQAAAAABAgADEQQSITEFQVEGImFxgRMykaGxwQdC0fAjUmJy4RSSshUzwtLx/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAJBEBAQEBAAICAgEFAQAAAAAAAAECESExAxJBUSIEE2GBoXH/2gAMAwEAAhEDEQA/ANQQwJCiGonQEojFEFRGKIBKIwSFEMCQcBDAkAQwIHASbTgIQgcBOtJAnWgdadaTadaBFp1pNp1oA2kEQrTrQAIgkRhEEwFkQCI0iAwgKYRbCOYRbCAoiARGsIBEoCdJnQpaiMUQFjVEINRDUQVEaogEBCAkAQwJBIEICcBCAhXASQINWoqKWY2VRck8gJ897QfiCwDJh0Kk6CowUkeIU3Hxkt4ce64jxTD4dc1aqqA7XOp8lGp9J5fiX4hYdP8AtIao63yjfoRPleIrvVqF3ZnZj3mOpJJ68hJoCnbLlu3UkAf/AGZuqvH0ZPxJW+uG05983t1923zl6n+IuFJsaVUeICnX4z5VWouNlNvkLwqCXupbL6E/OTtOPsGG7c4JzZi9PoXSwPqLges2aPF8O5ULWQlvdGYAn03nwgUrmwq+gP23l/CVKtK9irDobD4cxL9j6vutpFp8xwHbqupGdlI0BBA252I5z6HwriNOvTDob33HQzU10s4tESCIZEEiVCyIJjCIJEIUwgMIxhAYQEsIBEawgNAXOhTpVKWOURaxqwg1EaogLGLIJEJTOEMQqRCnCY3ari/+mwxcDvscieBIJJPkAx9JKPO9uO0yqrYembvbvHSy76Dq30tefNK7XBOa5JFufK5Ovp8Y7E1y5LkkksTc7k84hMKzWsLk/pznO1rixQTu5m6hbaX15/eSpa+VQMu97Xb0N/p0l3BcPL77INh6/bWOxOGOoRbFTa/XS3/tJ9o39bxkGi5YhWym1+gbxHLaQ6VQuQ+nP4GaOB4ZVckAHTUgctdf1hYjhVRPy3HI31+MfaJ9LzrKwtMq173by/UbwXdsx5knUDl5nrLRpm+xU9dDBZLaAX1ufGXrPFc1L7zV7P8AaOthXzI11zd5D7rL9j0PjMmpTF7jS3KAAM/nuPHwlH6E4ZjUr0kqp7ri/iDzB8QZZM8d+G/E1egaH5kuw/qVj9QdD5ieyIm5exmgIgGGRBMoWYDRhgNAUwimjmi2EIXOhzpVKWNURaRqwhixiwFhrIoxDEEQxAkTwX4kV8xp0V1I77fMAeW5PpPekT5Z2wY/6twf5rD+3Kv6TOr4XLztSgDT7v5TqNNb30+su4CnkFwl8w7vUeFusrcMw5d7Dnv4/u8+k8B4EFs7a6CwP185w3rkej4s/aqXBOzxAzNcZtl5C++a28c/Yt75qdRSbn372sb6EDz0857SjSG1peRRbacZa9GpmTnHy2r2UxtBs6MpPhr5b6mSvDahW7pdrWJI125AifT3AItKGJwKN7wveLaZzHx7iXBgW0572BFrSicGuo91hf5T7FV4ZTtYKAPAATGxfBKY1K3lm7PaX4ZfT5HiKJY6A31/xaVKIGbUz6NiuCpc2HiDznjuNcP9nVvyOv6zpnffDz7+O58n8B4scNiEqKdL2bndDowI+c+30agdFdSCGAII1BBFwRPzw7WN+nOfYvw6x4q4IC/epuyMOmxUjwIPxvO+XHT0xgmGwgmbZLMBhGGAwgLYRTRzRTQgZ06dKpSRyxSRqQhqw1gCGsgMQxBEMQqRPmnbmhlxl/5wlvXun/j859LE8X+I2E7lOuDYq2U+tyvz+szqeFz7eR7MU2OKChbi+p30n2CgluU+e9hsP/FNhfU3M+jW5Ty/JfL2/D4ybTMtK2kRTp9Y/KLTElbtgGbWA4vBcC+8JLGVrwU4mfikuNZqVQolSuBaYua1LHm8Qg1nlu0WCD0yeak28p7PHULjTeefxKZlZT5GM9l6zuSzj5m1hm+HyM+n/hLRZcNVYjRqndPXKtjPm/FcMUqMp6/KfYewFILw6jbmHY+Zdrme3Hny+dqc8PQNBMIiCZ0ZCYDRhgGAtopo1otoC7TpM6ULWNWKWNWENWEsFYYkBiEIIhiFcJj9r8MHwdTWxUBx5qQf1mwJnYrFK9Q4cMMxW5Vhoyka26zOtSTy38eLq8jC/D1B7N253A9LT1GI4hTp7nX6T5YOMYrD4l8PhgqK9VgGZc2gYgkeAsdB0nrGwA1fE4mqyra5Uolz6DQes8+s8vevTjXjknpc4j2tYaU6d97k/a33iML2mqMbuLeB2mJi8fhgbU6dZibgH2tS5IBY+7zsCbTMXGrU2aougIIcsdRcG1RDcEcxeT6+FmuV9JwnFFcE31tHpiwovefN8FxdsO16hL08wBYCzKT1GzbHpLnEO2uF1VFe9tCQAD87zH1v4dP7mfy9PxTjoX3TrPNYntHXvZRpPOVcWXcnvdd976+Qk+3CDM9NmFgfee1i2UHV1vqQNAZuZrnrf+no6XHq5FmUW+HznVMWH1tYzIXiFPL3qNhcr+dSCNCPeOsr41EZS1Go6ta6jOSCbbEGPr1L8nP8qfahRmQ9Z9V7I4cpgaCHcIL+FyTb5z5NgS1XK+IQuhIVCSV152I9NwZ6rFcSrK/tc9mzXCqSEQX2A8vjOk1Mzjn9L8ltnh9HMEzla4B6gH4yDO7zoMAxhizAW0BobRbQBnSJ0oWsckSsakIaIYgCEJAYhiAIYhUiZuKp0xXzsB3UIudBcm2/leaUq8RplkNgNuc5fLP4u/8ATX+fP28/isHS9lhqws3s8SpzAbrVY029MzIT/bFcc4W7vbMcmYEjwHITdpcOQ0PYkWV0INjYgte7KeRB1B62ld8TURSuJoOxGntaKGor/wBWVbsh01BGl9Cd557bY9H1k1f0wcXwzDvSFJhlAYkbX133BveIpcLpomRUJW4N2022AFhNg4vDkd2o6D+qlVU/BkBlenxbBKbZ6jtflSqt/wCAX5yd16bmcd7+VHGYFajYbDldGqe0cc/Z01N8x8SwX1mx2p4ZTqYZ0FNBp3LKBlIGhFhO4LQd6jYiqhRnslNDulIG4Df1MdT6DlNLiqE0yPCLec5+Gs4ll7Pb5rw6lnVCygiwDDoy6EH1Bm7xTB0aioHT3BYEEbcgbggypRRqFQkU2dGOZlW2ZG/MVBIBBte1xY+c0V4rhTplrA9PY1D/AMVIltsvhzmc85pkYijT9mEVdjfU3N+vnOpcOyUnfXRGsPEiwHqSPjN72tIi4oVnPTIyX/3lRJqqzhQ1P2aKwYKWVnYrqgYLdVUNZtGJJUbWN59r+S4n4jExGDC0lTYJk+C7/K8czI6Bl1HlbeXHQO5DbEG/0iez1ANXyXumYb9Ab/aWeVnM9v6fQaI7i/2j6TjJkEz2PnIMWYZMAygGi2jGi2gBOnToC1jFikjVlQ1TDUxYhiQMEIQFhAwoxBqLcfXyMkSZNTs41jVzqWfhVonK9swtrbqNt/hLLuG0lXEqQLAddfsZnjGEsRYixtqD++c8Wpc3lfQxqa8ruJpUEBLLfzOnwlDAYpajn2ahVGlwANfOUeMYnu21udAJcwWFy0goBUW5b36/OSOnW1h6IzAE77mKxtMW0tznm8McXQz56ntFJJUkAMvhpoRM1+0DnMCLG+k3zwk1J7qy4y1LA73vOpcRscroGF7A2v5XmEGqNUzFzboAPrvL+HNjqL9RM2MzXXolNO1wAJUxlQdZWerYWANpSLsfKZ41deDHBOYA2uLXm32YwQDZhso+LNz+F/jM7A4KpULZACAQCSbWve3pPW4DCilTCDU7sepO5nf4s3vXm+XcmfrPdWTIMkwTPS8aDAMIwTAFopjGNFNAG86ReTAWkYsUhjVMqGCMEWIYkBiEIsQxCjkgyBJgKxIuh8LGUigPKaTLcEddJmobadD9J5vnz5ler+n14sIfCKGzkA2HOIXjWEvZqyAjcX1HmJrAhltKOP4PSdQSillOhsLiccvVztLbiWEcEe2T46zDxvDsH73tl/3DfntNynw1LgNTRh3feW18vun5RdbhlLNm9kgIBGnmD+/Ob5/lfpf1/wBeXeph10FQnyER/wBUo3yqxJ0FrG4vtfpN7GYEDayjvaKBrm3icJgaaDRBcn18yZLYzrFn6RTu2nICAyAAy5XdUFuZ3mfXqaTHus3xHpeyqfw3bq/0A/Wbco8Go5KCDmVzHzbX7y7ee/E5mR4NXurUwSZxkGVlBgNDMAwAaLaMaKaBE6BOgAkasQhjkMqHCEICmMECRCEESZFME68AGSIB3mdiRZiepmgBKuKTcTl83qO3we6rI5B3mguomajXHlNDDNpPLx65VTFU2tofpKD03H5iJu5wdLRdVR0EvfDpxgthWOpJt0iqoy/abDuAbEDaYXE6usz7qa/jFCo5diTFomd1X+ZgPibQTUsLCP4cAKqFv51J9CJrM8uFvY9/ltpOM7MDqJ09zxIgkyTIMASYBMIwGgAximMY0U0CLyJE6UKWNWKWOSEMUxqmKWMWAYMMQRJEiphCCIxELGwgWMNT/Memn6yjiBckzXq0c1NkBtdSoPQkWBmBha+emCd9m8GHdYehBnm+a+ns+HPIp11INxCw2NAG+o5SzVS8yMfgSRdTY+E5R1rWHEUAP3lapxBes8fiqlZDYm8pHiNS839U/uceur49RrfXkJhY3FZm0PjM0VKjHWWsNQ5neT68Yu/sdRQ840MRr01nbSH1B8j9Jm3y1I9nwfFZqYHhcfeaF55/hxKBfAD6TeE9mL2PL8uea/8AU3gkyYJmnIJMFjCaLaADGLYwmMWxgROg3nShamMVolTGLCLCNGAxCmNQE7CA0GMRCdheNoYQnVtPCXUAGgEzdOmfjt9kUsL/ADH0H6y1TUAkC217eHWEo6yumlY35qB8/wDMza7ZxJ6Wc4mZi+H2LPTF8xu6+NrZlH1HrL9Wj0iVWoDppM6zNTlbl55jLO0Q6zcq4QNqbBz02PmJlYmkVJU6EfMdROOs3LpLNMuvg0caiY2K4ao5TZr1cpmdicWG0EnWblk/6a3OMVLS1k0krRktM5Vwh9IrCK1WrkX3V7znl4Lfqd/Lzh492UBEXM7HKijmT9p6fhHCBh6SqT3t3b+ZjqTLnPfLV8J9nZbSxh8YBZW00Fj+sjEuAMo5ykzA38DO8vHPWZr2280EmZyVGXbbpylpK4bwPSdJqV5tfHcmkxbGcWi2aaYcxiWMJjFkwjp0i86FAgJNhrNChgSdW08OcsUKKpoB68zLAmbp2z8UnsNOhTXZb+essonOAgtCUkzLpJ+hmNRYIWEIVKmJxK6hukbJOogiUOZYpwRrBoNlax2MuZLwXwppiwCAdzr6TztTjJxGNegqqEpXBYDvu+l8rcgDcbHab+NREVqje6qlm6WUGeM7FI1nruhs7s9iDbqNNzuZnXpZ+2pxXhzAEg3HPkR5j7zBNAg62m03GwajrrawAup3BN/SxHwmaBaoU5E3XyPT6ek5azyddJ2+w0qd9JbTCk6LbQXZjoqjmWMfRw3Ifp84nF4ke4nuLvbdm5sftM5z9q13npl47FDDKalBQ7nao68v6U/KvzMPgHbcV6go10CufcZfcPg1z3T8p2Pwj1Vyjc6xHZvs+lF3qvYse6oOtrG5+07ScjFegxzjOTyGglfCLfMYjFPfaaWEp2p+cflfUNNPTTlrIFMGW8NTBXUxSpuOhmmOkkMu+oglpbWx0IlWpTsfp4yzXHLXxy+i2MAmGywHQibmpXHWNZDmnQZ0rLfURggIdJOs5vYZGpoLRKiMBhKbeSpigZN4DwwkXig8nPCGZbyUdh3c2XmDvFh5LAMLMAR0IBELZ1n16aYqnlD/AMK9tN3ytYm/Jbg+e8u0sOqKFUAKBYWjSgAGWwsNANBbygo8HVY0CDmXun5TK7QUT7P2hNymug/IT3v19J6BpVxNMMjIdmBU+RFjJqdnGs65es/C4RGp3bZtT/aP8xX+lps4FNAEU99jzPJR9ZYpYfMFQXCKACb/AJVFh5k6n1jjtlQZV2Udbm1z89ZJOTi23qotEKrPb3jlUeA0+t5Xq8OY90A3LXv0ze/+/GaoQM4A91LAeYj2fvjyP2l4nWavBkG+vnCq0QDlHSaDvKpN6hPRYTtBSSwgVNCSIbPeKvqYCi4vHFcyysF72WWqJ5WhVQDcHcfPxkNT6fvwjq45jcRa1NPIwit7M/yzpZyyJep9Z+mmLTrysrxitBw28YD4xOaReFPBhip4SuphBvGA8tO0i7wxCCAkwRJEAw0h7jpBEm8Ake8UzXJHP3fj/icy21EUGN97aXJ8/wDA+ciwVaqF7ijMTv8A5PTaLoo1wTvq3htZfrOooAptfMTYlt4Y95tdBlX4a/cQdGmmg/Ziy/8AEPkBCEQPegG7QEPvG0mqdDBPuGAhPd9ZxbX1iQ+gHjDTVrfsCFA4IYsY+iTrEYqoLkcpHtwFhBZtT5xbWvBpt94R5ecKV7Qzp1hOgf/Z" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;