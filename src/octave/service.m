pkg load sockets;

args = argv();
port = str2num(args{1});
bufferSize = str2num(args{2});

s = socket();
bind(s, port);
listen(s, 0);

client = accept(s);

while true
    [buffer, count] = recv(client, bufferSize);

    if count > 0
        % Data parsing logic.
        disp(buffer);
        send(client, buffer);
    else
        % Client disconnected.
        break;
    end
end