import ResponsiveAppBar from "../menu/AppBar";

export default function CustomPage(props: any) {
    return (
        <>
            <ResponsiveAppBar />
            <div style={{padding: '20px', paddingTop: '20px', overflow: 'auto', maxHeight: 'calc(100vh - 70px)'}}>
                {...props.children}
            </div>
        </>
    );
}