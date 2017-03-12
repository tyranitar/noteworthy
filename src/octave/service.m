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
        % Load the weights once upon deployment and keep it in memory.
        % Call predict_notes here with the file location and weights as the arguments.
        disp(buffer);
        send(client, buffer);
    else
        % Client disconnected.
        break;
    end
end