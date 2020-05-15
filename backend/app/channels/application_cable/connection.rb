module ApplicationCable
  class Connection < ActionCable::Connection::Base
    def connect
      puts ">> SOMEBODY CONNECTING #{cookies}"
    end

  end
end
