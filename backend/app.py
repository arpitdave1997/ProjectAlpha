from app import create_app

if __name__ == "__main__":
    app = create_app()
    
    port = app.config.get('PORT')
    debug = app.config.get('DEBUG')

    app.run(port = port, debug = debug)
